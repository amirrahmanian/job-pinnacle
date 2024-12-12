import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppEnvConfigType } from 'src/common/type/app-env.type';
import { DbModule } from 'src/db/db.module';
import { SessionModule } from 'src/session/session.module';

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
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
