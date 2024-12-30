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
import { VerifyOtpParams } from './interface/verify-otp.params';
import { OTP_MAX_ATTEMPTS } from './constant/otp.constant';

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

          await this.redisClient.setex(attemptsKey, attemptsTtl, 0);

          await this.redisClient.setex(otpKey, otpTtl, otp);

          return code;
        })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  async verifyOtp(verifyOtpParams: VerifyOtpParams) {
    const { id, code, type, operation } = verifyOtpParams;
    const otpKey = `${id}-${type}-${operation}`;
    const attemptsKey = `${otpKey}:attempts`;

    const otp = await this.redisClient.get(otpKey);

    if (!otp) throw new BadRequestException('not_valid.otp');

    const attemptsVal = await this.redisClient.get(attemptsKey);

    if (attemptsVal == null) {
      throw new BadRequestException('not_valid.otp');
    }

    let attempts = +attemptsVal;

    if (attempts >= OTP_MAX_ATTEMPTS)
      throw new BadRequestException('not_valid.otp');

    attempts = await this.redisClient.incr(attemptsKey);

    if (attempts > OTP_MAX_ATTEMPTS)
      throw new BadRequestException('not_valid.otp');

    const storedCode = otp.split(':')[1];

    if (storedCode != code) throw new BadRequestException('not_valid.otp');

    await this.redisClient.del(otpKey, attemptsKey);
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
