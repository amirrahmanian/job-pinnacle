import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/db/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserBodyDto } from './dto/sign-up-user-body.dto';
import { UserEntity } from 'src/db/entity/user.entity';
import { RoleEnum } from 'src/common/enum/role.enum';
import { IncomingHttpHeaders } from 'http';
import { JwtAccessTokenPayload } from './type/jwt-access-token-payload.type';
import { ISessionRefreshTokenPayload } from 'src/session/interface/session-refresh-token-payload.interface';
import { parseDevice } from 'src/util/parese-device.util';
import { SessionService } from 'src/session/session.service';
import { LoginBodyDto } from './dto/login-body.dto';
import { RefreshQueryBodyDto } from './dto/refresh-body.dto';
import { LogoutBodyDto } from './dto/logout-body.dto';
import { UserPayload } from './type/user-payload.type';
import { ForgetPasswordSendOtpBodyDto } from './dto/forget-password-send-otp-body.dto';
import { OtpService } from 'src/otp/otp.service';
import { OtpOperationTypeEnum } from '../otp/enum/otp-operation-type.enum';
import { OtpTypeEnum } from 'src/otp/enum/otp-type.enum';
import { MailerService } from '@nestjs-modules/mailer';
import { AppEnvConfigType } from 'src/common/type/app-env.type';
import { ConfigService } from '@nestjs/config';
import { ForgetPasswordVerifyOtpDto } from './dto/forget-password-verify-otp-body.dto';
import { ForgetPasswordBodyDto } from './dto/forget-password-body.dto';

@Injectable()
export class AuthService {
  private nodeEnv: string;

  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private sessionService: SessionService,
    private otpService: OtpService,
    private mailerService: MailerService,
    configService: ConfigService<AppEnvConfigType>,
  ) {
    this.nodeEnv = configService.get('nodeEnv', { infer: true });
  }

  async register(
    body: SignUpUserBodyDto,
    ip: string,
    headers: IncomingHttpHeaders,
  ) {
    const user: Pick<UserEntity, 'id'> = await this.userRepository.findOne({
      where: { email: body.email },
      select: { id: true },
    });

    if (user) throw new BadRequestException('duplicate.email');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const insertUserResult = await this.userRepository.insert({
      ...body,
      password: hashedPassword,
      role: RoleEnum.User,
    });

    const userId: UserEntity['id'] = insertUserResult.generatedMaps[0].id;

    const { accessToken, refreshToken } = await this.generateTokens(
      {
        id: userId,
        role: RoleEnum.User,
      },
      ip,
      headers,
    );

    return { accessToken, refreshToken };
  }

  async login(body: LoginBodyDto, ip: string, headers: IncomingHttpHeaders) {
    const user = await this.userRepository.findOne({
      where: { email: body.email },
      select: { id: true, role: true, password: true },
    });

    if (!user) throw new NotFoundException('user.not_found');

    const isMatched = await bcrypt.compare(body.password, user.password);

    if (!isMatched) throw new BadRequestException('invalid_credentials');

    const { accessToken, refreshToken } = await this.generateTokens(
      { id: user.id, role: user.role },
      ip,
      headers,
    );

    return { accessToken, refreshToken };
  }

  async refresh(body: RefreshQueryBodyDto) {
    const session = await this.sessionService
      .verify(body.refreshToken)
      .catch(() => {
        throw new UnauthorizedException();
      });

    const accessToken = await this.generateAccessToken({
      id: session.userId,
      role: session.role,
    });

    return { accessToken };
  }

  async logout(body: LogoutBodyDto, userPayload: UserPayload) {
    const isDeleted = await this.sessionService.revoke(
      body.refreshToken,
      userPayload.userId,
    );

    if (!isDeleted) {
      throw new NotFoundException('not_found.session');
    }
  }

  async forgetPasswordSendOtp(body: ForgetPasswordSendOtpBodyDto) {
    const user: Pick<UserEntity, 'id' | 'email'> =
      await this.userRepository.findOne({
        where: { email: body.email },
        select: { id: true, email: true },
      });

    if (!user) throw new NotFoundException('not_found.user');

    // create otp
    const otp = await this.otpService.createOtp({
      id: user.email,
      operation: OtpOperationTypeEnum.FORGET_PASSWORD,
      type: OtpTypeEnum.EMAIL,
    });

    // send email
    if (this.nodeEnv === 'development') {
      console.log(`we have sent the code(${otp}) to your email(${user.email})`);
    } else {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Change password',
        text: `Forgot your password? If you didn't forget your password, please ignore this email. otherwise copy the code : ${otp}`,
      });
    }
  }

  async forgetPasswordVerifyOtp(body: ForgetPasswordVerifyOtpDto) {
    const user: Pick<UserEntity, 'id' | 'email'> =
      await this.userRepository.findOne({
        where: { email: body.email },
        select: { id: true, email: true },
      });

    if (!user) throw new BadRequestException('not_found.user');

    // verify otp
    await this.otpService.verifyOtp({
      id: user.email,
      code: body.otpCode,
      operation: OtpOperationTypeEnum.FORGET_PASSWORD,
      type: OtpTypeEnum.EMAIL,
    });

    // create otp token
    const token = await this.otpService.createOtp({
      id: body.email,
      operation: OtpOperationTypeEnum.FORGET_PASSWORD,
      type: OtpTypeEnum.TOKEN,
    });

    return { token };
  }

  async forgetPassword(body: ForgetPasswordBodyDto) {
    const user: Pick<UserEntity, 'id' | 'email'> =
      await this.userRepository.findOne({
        where: { email: body.email },
        select: { id: true, email: true },
      });

    if (!user) throw new NotFoundException('not_found.user');

    // verify otp
    await this.otpService.verifyOtp({
      id: user.email,
      code: body.otpCode,
      operation: OtpOperationTypeEnum.FORGET_PASSWORD,
      type: OtpTypeEnum.TOKEN,
    });

    // purge all user active refresh tokens
    await this.sessionService.purgeUserActiveTokens(user.id);

    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // set new password
    await this.userRepository.update(user.id, { password: hashedPassword });
  }

  async generateTokens(
    user: Pick<UserEntity, 'id' | 'role'>,
    ip: string,
    headers: IncomingHttpHeaders,
  ) {
    const [refreshToken, accessToken] = await Promise.all([
      this.generateRefreshToken(user, ip, headers),
      this.generateAccessToken(user),
    ]);

    return { refreshToken, accessToken };
  }

  async generateRefreshToken(
    user: Pick<UserEntity, 'id' | 'role'>,
    ip: string,
    headers: IncomingHttpHeaders,
  ) {
    const userAgent = headers['user-agent'];
    const device = parseDevice(userAgent);

    const payload: ISessionRefreshTokenPayload = {
      userId: user.id,
      role: user.role,
      ip,
      userAgent,
      device,
    };

    const refreshToken = await this.sessionService.sign(payload);

    return refreshToken;
  }

  async generateAccessToken(user: Pick<UserEntity, 'id' | 'role'>) {
    const payload: JwtAccessTokenPayload = { userId: user.id, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }
}
