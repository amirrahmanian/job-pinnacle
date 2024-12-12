import { Injectable } from '@nestjs/common';
import { SessionRepository } from 'src/db/repository/session.repository';
import { ISessionRefreshTokenPayload } from './interface/session-refresh-token-payload.interface';
import { AppEnvConfigType } from 'src/common/type/app-env.type';
import { ConfigService } from '@nestjs/config';
import { ISessionOptions } from './interface/session-options.interface';
import { parseSeconds } from 'src/util/parse-secounds.util';
import { randomUUID } from 'crypto';
import { encrypt } from 'src/util/aes-methods.util';

@Injectable()
export class SessionService {
  private options: ISessionOptions;

  constructor(
    private sessionRepository: SessionRepository,
    configService: ConfigService<AppEnvConfigType>,
  ) {
    const sessionEnvConfig = configService.get('session', { infer: true });

    this.options = {
      secret: sessionEnvConfig.secret,
      expiresIn: parseSeconds(sessionEnvConfig.expiresIn),
      salt: sessionEnvConfig.salt,
    };
  }

  async sign(payload: ISessionRefreshTokenPayload) {
    const key = randomUUID();

    const expireDate = new Date(Date.now() + this.options.expiresIn * 1000);

    await this.sessionRepository.insert({
      userId: payload.userId,
      clientId: payload.clientId,
      role: payload.role,
      key,
      ip: payload.ip,
      userAgent: payload.userAgent,
      device: payload.device,
      expireDate,
    });

    const token = (
      await encrypt(Buffer.from(key), this.options.secret, this.options.salt)
    ).toString('base64');

    return token;
  }
}
