import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appEnvConfig from './config/app-env.config';
import { AppEnvConfigType } from './common/type/app-env.type';
import validationConfig from './config/validation.config';

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
    DbModule,
  ],
})
export class AppModule {}
