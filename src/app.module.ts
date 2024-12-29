import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appEnvConfig from './config/app-env.config';
import { AppEnvConfigType } from './common/type/app-env.type';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { OtpModule } from './otp/otp.module';
import { RedisModule } from './redis/redis.module';
import { JobModule } from './job/job.module';
import { CompanyModule } from './company/company.module';
import { EventModule } from './event/event.module';
import validationConfig from './config/validation.config';
import { MessageModule } from './message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification/notification.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appEnvConfig],
      validationSchema: validationConfig,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppEnvConfigType>) => {
        const postgresEnvConfig = configService.get('postgres', {
          infer: true,
        });

        return {
          type: 'postgres',
          database: postgresEnvConfig.dbname,
          host: postgresEnvConfig.url,
          port: postgresEnvConfig.port,
          username: postgresEnvConfig.username,
          password: postgresEnvConfig.password,
          entities: ['dist/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,

          /**
           * TODO: delete below options in future
           */
          synchronize: true,
          logging: true,
        };
      },
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppEnvConfigType>) => {
        const mongoEnvConfig = configService.get('mongo', { infer: true });

        return {
          uri: mongoEnvConfig.uri,
        };
      },
    }),
    DbModule,
    AuthModule,
    SessionModule,
    OtpModule,
    RedisModule,
    JobModule,
    CompanyModule,
    MessageModule,
    EventModule,
    NotificationModule,
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
