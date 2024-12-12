import { RoleEnum } from 'src/common/enum/role.enum';

export type JwtAccessTokenPayload = {
  userId: number;
  role: RoleEnum;
};
