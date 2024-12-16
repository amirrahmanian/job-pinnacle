import { IsDefined, IsEmail, IsString, Matches } from 'class-validator';
import { OTP_CODE_REGEX } from 'src/otp/constant/otp-regex.constant';

export class ForgetPasswordVerifyOtpDto {
  @IsDefined()
  @IsString()
  @Matches(OTP_CODE_REGEX)
  otpCode: string;

  @IsDefined()
  @IsEmail()
  email: string;
}
