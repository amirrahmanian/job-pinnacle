import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from 'src/common/enum/user-role.enum';

export const API_PRIVATE_META_DATA = 'isPrivate';
export const Private = (role: UserRoleEnum) =>
  SetMetadata(API_PRIVATE_META_DATA, role);
