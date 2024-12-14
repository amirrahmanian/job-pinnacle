import { RoleEnum } from 'src/common/enum/role.enum';

export interface ISessionRefreshTokenPayload {
  userId: number;
  role: RoleEnum;
  ip: string;
  location?: string;
  device?: string;
  userAgent?: string;
}
