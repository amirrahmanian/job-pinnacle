import { SetMetadata } from '@nestjs/common';

export const API_PUBLIC_META_DATA = 'isPublic';
export const Public = () => SetMetadata(API_PUBLIC_META_DATA, true);
