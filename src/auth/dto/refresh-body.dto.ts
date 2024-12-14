import { IsBase64, IsDefined } from 'class-validator';

export class RefreshQueryBodyDto {
  @IsDefined()
  @IsBase64()
  refreshToken: string;
}
