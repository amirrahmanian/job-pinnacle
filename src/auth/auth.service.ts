import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

  async signUpUser(
    signUpUserBodyDto: SignUpUserBodyDto,
    clientId: string,
    ip: string,
    headers: IncomingHttpHeaders,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: signUpUserBodyDto.email },
      select: { id: true },
    });

    if (user) throw new BadRequestException('duplicate.email');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signUpUserBodyDto.password, salt);

    const insertUserResult = await this.userRepository.insert({
      ...signUpUserBodyDto,
      password: hashedPassword,
      role: RoleEnum.User,
    });

    const userId: UserEntity['id'] = insertUserResult.generatedMaps[0].id;

    const { accessToken, refreshToken } = await this.generateTokens(
      {
        id: userId,
        role: RoleEnum.User,
      },
      clientId,
      ip,
      headers,
    );

    return { accessToken, refreshToken };
  }

  async generateTokens(
    user: Pick<UserEntity, 'id' | 'role'>,
    clientId: string,
    ip: string,
    headers: IncomingHttpHeaders,
  ) {
    const [refreshToken, accessToken] = await Promise.all([
      this.generateRefreshToken(user, clientId, ip, headers),
      this.generateAccessToken(user),
    ]);

    return { refreshToken, accessToken };
  }

  async generateRefreshToken(
    user: Pick<UserEntity, 'id' | 'role'>,
    clientId: string,
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
      clientId,
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
