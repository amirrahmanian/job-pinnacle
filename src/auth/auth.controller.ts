import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserBodyDto } from './dto/sign-up-user-body.dto';
import { IncomingHttpHeaders } from 'http';
import { ClientIp } from 'src/common/decorator/client-ip.decorator';
import { LoginBodyDto } from './dto/login-body.dto';
import { RefreshQueryBodyDto } from './dto/refresh-body.dto';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  register(
    @Body() signUpUserBodyDto: SignUpUserBodyDto,
    @ClientIp() ip: string,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return this.authService.register(signUpUserBodyDto, ip, headers);
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
}
