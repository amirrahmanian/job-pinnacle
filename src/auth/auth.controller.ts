import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterJobSeekerBodyDto } from './dto/register-job-seeker-body.dto';
import { IncomingHttpHeaders } from 'http';
import { ClientIp } from 'src/common/decorator/client-ip.decorator';
import { LoginBodyDto } from './dto/login-body.dto';
import { RefreshQueryBodyDto } from './dto/refresh-body.dto';
import { Public } from './decorator/public.decorator';
import { LogoutBodyDto } from './dto/logout-body.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { UserPayload } from './type/user-payload.type';
import { ForgetPasswordSendOtpBodyDto } from './dto/forget-password-send-otp-body.dto';
import { ForgetPasswordVerifyOtpDto } from './dto/forget-password-verify-otp-body.dto';
import { ForgetPasswordBodyDto } from './dto/forget-password-body.dto';
import { RegisterFounderBodyDto } from './dto/register-founder-body.dto';
import { RegisterFounderSendOtpBodyDto } from './dto/register-founder-send-otp-body.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register-job-seeker')
  @Public()
  registerJobSeeker(
    @Body() registerJobSeekerBodyDto: RegisterJobSeekerBodyDto,
    @ClientIp() ip: string,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return this.authService.registerJobSeeker(
      registerJobSeekerBodyDto,
      ip,
      headers,
    );
  }

  @Post('register-founder/send/otp')
  @Public()
  registerFounderSendOtp(@Body() dto: RegisterFounderSendOtpBodyDto) {
    return this.authService.registerFounderSendOtp(dto);
  }

  @Post('register-founder')
  @Public()
  registerFounder(
    @Body() registerFounderBodyDto: RegisterFounderBodyDto,
    @ClientIp() ip: string,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return this.authService.registerFounder(
      registerFounderBodyDto,
      ip,
      headers,
    );
  }

  @Post('login')
  @Public()
  login(
    @Body() loginBodyDto: LoginBodyDto,
    @ClientIp() ip: string,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return this.authService.login(loginBodyDto, ip, headers);
  }

  @Post('refresh-token')
  @Public()
  refresh(@Body() refreshToken: RefreshQueryBodyDto) {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(
    @Body() logoutBodyDto: LogoutBodyDto,
    @User() userPayload: UserPayload,
  ) {
    return this.authService.logout(logoutBodyDto, userPayload);
  }

  @Post('forget-password/send/otp')
  @Public()
  forgetPasswordSendOtp(
    @Body() forgetPasswordSendOtpBodyDto: ForgetPasswordSendOtpBodyDto,
  ) {
    return this.authService.forgetPasswordSendOtp(forgetPasswordSendOtpBodyDto);
  }

  @Post('forget-password/verify/otp')
  @Public()
  forgetPasswordVerifyOtp(
    @Body() forgetPasswordVerifyOtpDto: ForgetPasswordVerifyOtpDto,
  ) {
    return this.authService.forgetPasswordVerifyOtp(forgetPasswordVerifyOtpDto);
  }

  @Post('forget-password')
  @Public()
  forgetPassword(@Body() forgetPasswordBodyDto: ForgetPasswordBodyDto) {
    return this.authService.forgetPassword(forgetPasswordBodyDto);
  }
}
