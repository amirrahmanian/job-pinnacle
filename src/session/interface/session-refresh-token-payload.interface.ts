import { RoleEnum } from 'src/common/enum/role.enum';

export interface ISessionRefreshTokenPayload {
  userId: number;
  role: RoleEnum;
  clientId: string;
  ip: string;
  location?: string;
  device?: string;
  userAgent?: string;
}
