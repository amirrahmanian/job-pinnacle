import { Injectable } from '@nestjs/common';
import { SessionRepository } from 'src/db/repository/session.repository';
import { ISessionRefreshTokenPayload } from './interface/session-refresh-token-payload.interface';
import { AppEnvConfigType } from 'src/common/type/app-env.type';
import { ConfigService } from '@nestjs/config';
import { ISessionOptions } from './interface/session-options.interface';
import { parseSeconds } from 'src/util/parse-secounds.util';
import { randomUUID } from 'crypto';
import { decrypt, encrypt } from 'src/util/aes-methods.util';
import { SessionEntity } from 'src/db/entity/session.entity';
import { IsNull, MoreThan } from 'typeorm';

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

  async verify(token: string) {
    const key = (
      await decrypt(
        Buffer.from(token, 'base64'),
        this.options.secret,
        this.options.salt,
      )
    ).toString();

    const session: Pick<
      SessionEntity,
      'id' | 'userId' | 'role' | 'expireDate'
    > = await this.sessionRepository.findOne({
      where: { key },
      select: { id: true, userId: true, role: true, expireDate: true },
    });

    if (!session) {
      throw new Error('session.not_found');
    }

    if (session.expireDate < new Date()) {
      throw new Error('session.expired');
    }

    return session;
  }

  async revoke(refreshToken: string, userId: number) {
    const key = (
      await decrypt(
        Buffer.from(refreshToken, 'base64'),
        this.options.secret,
        this.options.salt,
      )
    ).toString();

    const result = await this.sessionRepository.softDelete({
      key,
      userId,
      expireDate: MoreThan(new Date()),
      deletedAt: IsNull(),
    });

    const deleted = !!result;

    return deleted;
  }
}
