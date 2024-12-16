import { UserRoleEnum } from 'src/common/enum/user-role.enum';

export type JwtAccessTokenPayload = {
  userId: number;
  role: UserRoleEnum;
};
