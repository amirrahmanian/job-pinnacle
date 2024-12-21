import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { API_PUBLIC_META_DATA } from '../decorator/public.decorator';
import { JwtService } from '@nestjs/jwt';
import { JwtAccessTokenPayload } from '../type/jwt-access-token-payload.type';
import { AppEnvConfigType } from 'src/common/type/app-env.type';
import { ConfigService } from '@nestjs/config';
import { UserRoleEnum } from 'src/common/enum/user-role.enum';
import { API_PRIVATE_META_DATA } from '../decorator/private.decorator';

@Injectable()
export class JwtAccessTokenGuard implements CanActivate {
  private jwtSercret: string;

  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    configService: ConfigService<AppEnvConfigType>,
  ) {
    this.jwtSercret = configService.get('jwt', { infer: true }).secret;
  }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(req);

    const isOptional = this.reflector.get<boolean>(
      API_PUBLIC_META_DATA,
      context.getHandler(),
    );

    if (isOptional) return true;

    try {
      const payload: JwtAccessTokenPayload = await this.jwtService.verifyAsync(
        token,
        { secret: this.jwtSercret },
      );

      const isPrivate = this.reflector.get<UserRoleEnum>(
        API_PRIVATE_META_DATA,
        context.getHandler(),
      );

      if (isPrivate && payload.role !== isPrivate) throw new Error();

      req['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers['authorization']?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
