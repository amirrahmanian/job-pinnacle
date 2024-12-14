import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { AppEnvConfigType } from 'src/common/type/app-env.type';

@Injectable()
export class RedisClient extends Redis {
  constructor(configService: ConfigService<AppEnvConfigType>) {
    const redisEnvConfig = configService.get('redis', { infer: true });

    super({
      host: redisEnvConfig.host,
      port: redisEnvConfig.port,
      password: redisEnvConfig.password,
    });
  }
}
