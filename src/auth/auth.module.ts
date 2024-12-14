import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppEnvConfigType } from 'src/common/type/app-env.type';
import { DbModule } from 'src/db/db.module';
import { SessionModule } from 'src/session/session.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessTokenGuard } from './guard/jwt-access-token.guard';

@Module({
  imports: [
    DbModule,
    SessionModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppEnvConfigType>) => {
        const jwtEnvConfig = configService.get('jwt', { infer: true });

        return {
          secret: jwtEnvConfig.secret,
          signOptions: { expiresIn: jwtEnvConfig.expiresIn },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: JwtAccessTokenGuard },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
