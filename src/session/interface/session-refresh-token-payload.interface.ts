import { UserRoleEnum } from 'src/common/enum/user-role.enum';

export interface ISessionRefreshTokenPayload {
  userId: number;
  role: UserRoleEnum;
  ip: string;
  location?: string;
  device?: string;
  userAgent?: string;
}
