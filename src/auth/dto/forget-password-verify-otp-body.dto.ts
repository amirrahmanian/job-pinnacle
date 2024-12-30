import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Matches } from 'class-validator';
import { OTP_CODE_REGEX } from 'src/otp/constant/otp-regex.constant';

export class ForgetPasswordVerifyOtpDto {
  @ApiProperty({
    description: 'OTP code for password reset verification.',
    example: '654321',
  })
  @IsDefined()
  @IsString()
  @Matches(OTP_CODE_REGEX)
  otpCode: string;

  @ApiProperty({
    description: 'Email address associated with the account.',
    example: 'user@example.com',
  })
  @IsDefined()
  @IsEmail()
  email: string;
}
