import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsDefined } from 'class-validator';

export class RefreshQueryBodyDto {
  @ApiProperty({
    description: 'Refresh token for the session.',
    example:
      'w1d4Kdb8id8J1qh5un1xK4mf1JDmw6dkgj54GWmEqY+F4tToAz8TRdq+8djeCCvTbcRHBA==',
  })
  @IsDefined()
  @IsBase64()
  refreshToken: string;
}
