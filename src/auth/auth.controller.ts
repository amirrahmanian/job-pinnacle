import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Patch,
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
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register-job-seeker')
  @Public()
  @ApiOperation({
    summary: 'Register a new job seeker',
    description: 'Register a new job seeker with the provided information.',
  })
  @ApiResponse({
    status: 201,
    description: 'Job seeker registered successfully.',
  })
  async registerJobSeeker(
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Send OTP to register a founder',
    description:
      'Send an OTP to the specified phone number for founder registration.',
  })
  @ApiResponse({ status: 204, description: 'OTP sent successfully.' })
  async registerFounderSendOtp(@Body() dto: RegisterFounderSendOtpBodyDto) {
    return this.authService.registerFounderSendOtp(dto);
  }

  @Post('register-founder')
  @Public()
  @ApiOperation({
    summary: 'Register a new founder',
    description:
      'Register a new founder using the provided information and OTP.',
  })
  @ApiResponse({ status: 201, description: 'Founder registered successfully.' })
  async registerFounder(
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
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login a user',
    description: 'Authenticate a user and return a token.',
  })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  async login(
    @Body() loginBodyDto: LoginBodyDto,
    @ClientIp() ip: string,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return this.authService.login(loginBodyDto, ip, headers);
  }

  @Post('refresh-token')
  @Public()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Refresh authentication token',
    description: 'Refresh the token using the refresh token.',
  })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully.' })
  async refresh(@Body() refreshToken: RefreshQueryBodyDto) {
    return this.authService.refresh(refreshToken);
  }

  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Logout a user',
    description: 'Logout a user and invalidate the refresh token.',
  })
  @ApiResponse({ status: 204, description: 'Logout successful.' })
  async logout(
    @Body() logoutBodyDto: LogoutBodyDto,
    @User() userPayload: UserPayload,
  ) {
    return this.authService.logout(logoutBodyDto, userPayload);
  }

  @Post('forget-password/send/otp')
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Send OTP for password reset',
    description: 'Send an OTP to the user’s email address for password reset.',
  })
  @ApiResponse({ status: 204, description: 'OTP sent successfully.' })
  async forgetPasswordSendOtp(
    @Body() forgetPasswordSendOtpBodyDto: ForgetPasswordSendOtpBodyDto,
  ) {
    return this.authService.forgetPasswordSendOtp(forgetPasswordSendOtpBodyDto);
  }

  @Post('forget-password/verify/otp')
  @Public()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Verify OTP for password reset',
    description: 'Verify the OTP sent to the user’s email address.',
  })
  @ApiResponse({ status: 200, description: 'OTP verified successfully.' })
  async forgetPasswordVerifyOtp(
    @Body() forgetPasswordVerifyOtpDto: ForgetPasswordVerifyOtpDto,
  ) {
    return this.authService.forgetPasswordVerifyOtp(forgetPasswordVerifyOtpDto);
  }

  @Patch('forget-password')
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Reset password',
    description: 'Reset the user’s password using the OTP and new password.',
  })
  @ApiResponse({ status: 204, description: 'Password reset successfully.' })
  async forgetPassword(@Body() forgetPasswordBodyDto: ForgetPasswordBodyDto) {
    return this.authService.forgetPassword(forgetPasswordBodyDto);
  }
}
