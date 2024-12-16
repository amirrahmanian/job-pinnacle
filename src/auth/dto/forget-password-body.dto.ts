import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class ForgetPasswordBodyDto {
  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;

  @IsDefined()
  @IsString()
  otpCode: string;

  @IsDefined()
  @IsEmail()
  email: string;
}
