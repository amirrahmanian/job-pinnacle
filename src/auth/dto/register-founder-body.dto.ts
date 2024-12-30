import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Email address of the founder.',
    example: 'founder@example.com',
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the founder (minimum 8 characters).',
    example: 'securePassword123',
  })
  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Cellphone number of the founder.',
    example: '+1234567890',
  })
  @ValidateIf((val: any) => val !== val.password)
  @IsDefined()
  @IsPhoneNumber()
  cellphone: string;

  @ApiProperty({
    description: 'OTP code for verification.',
    example: '123456',
  })
  @IsDefined()
  @IsString()
  @Matches(OTP_CODE_REGEX)
  otpCode: string;
}
