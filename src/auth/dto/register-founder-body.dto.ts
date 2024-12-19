import {
  IsDefined,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { OTP_CODE_REGEX } from 'src/otp/constant/otp-regex.constant';

export class RegisterFounderBodyDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;

  /**
   * Cellphone
   * @example +989108869419
   */
  @ValidateIf((val: any) => val !== val.password)
  @IsDefined()
  @IsPhoneNumber()
  cellphone: string;

  @IsDefined()
  @IsString()
  @Matches(OTP_CODE_REGEX)
  otpCode: string;
}
