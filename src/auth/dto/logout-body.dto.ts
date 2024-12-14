import { IsBase64, IsDefined, IsNotEmpty } from 'class-validator';

export class LogoutBodyDto {
  /**
   * Refresh Token
   * @example w1d4Kdb8id8J1qh5un1xK4mf1JDmw6dkgj54GWmEqY+F4tToAz8TRdq+8djeCCvTbcRHBA==
   */
  @IsDefined()
  @IsNotEmpty()
  @IsBase64()
  refreshToken: string;
}
