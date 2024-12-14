import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisClient } from 'src/redis/redis.client';
import { ICreateOtpParams } from './interface/create-otp-params.interface';
import {
  OTP_CODE_DEFAULT_LENGTH,
  OTP_DEFAULT_TTL,
} from './constant/otp-default.constant';
import * as AsyncLock from 'async-lock';
import { OtpTypeEnum } from './enum/otp-type.enum';
import { randomInt, randomUUID } from 'crypto';

@Injectable()
export class OtpService {
  private lock: AsyncLock;

  constructor(private redisClient: RedisClient) {
    this.lock = new AsyncLock();
  }

  createOtp(createOtpParams: ICreateOtpParams) {
    const { id, type, operation, options } = createOtpParams;

    const otpKey = `${id}-${type}-${operation}`;
    const attemptsKey = `${otpKey}:attempts`;

    const otpTtl = options?.ttl ?? OTP_DEFAULT_TTL;
    const attemptsTtl = otpTtl + 10;

    return new Promise<string>((resolve, reject) => {
      this.lock
        .acquire(otpKey, async () => {
          // if timout is passed, search for previous otp in defined timout
          if (options?.timeout != null) {
            const previousOtp = await this.redisClient.get(otpKey);

            if (previousOtp != null) {
              const createdTime = +previousOtp.split(':')[0];

              if (
                createdTime >=
                Math.floor(Date.now() / 1000) - options?.timeout
              ) {
                throw new BadRequestException('try_later');
              }
            }
          }

          const time = Math.floor(Date.now() / 1000);
          const code = this.generateCode(type);
          const otp = `${time}:${code}`;

          // create or replace attempts
          await this.redisClient.setex(attemptsKey, attemptsTtl, 0);

          // create or replace otp
          await this.redisClient.setex(otpKey, otpTtl, otp);

          return code;
        })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  async verifyCode(createOtpParams: ICreateOtpParams, code: string) {
    const { id, type, operation } = createOtpParams;
    const otpKey = `${id}-${type}-${operation}`;

    const realCode = (await this.redisClient.get(otpKey))?.split(':')[1] ?? [];

    console.log(realCode, '   ', code);
  }

  protected generateCode(type: OtpTypeEnum) {
    switch (type) {
      case OtpTypeEnum.EMAIL:
      case OtpTypeEnum.SMS:
        return randomInt(
          10 ** (OTP_CODE_DEFAULT_LENGTH - 1),
          10 ** OTP_CODE_DEFAULT_LENGTH,
        ).toString();
      default:
        return randomUUID();
    }
  }
}
