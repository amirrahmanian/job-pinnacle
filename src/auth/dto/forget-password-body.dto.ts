import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class ForgetPasswordBodyDto {
  @ApiProperty({
    description: 'New password (minimum 8 characters).',
    example: 'newSecurePassword123',
  })
  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'OTP code for password reset.',
    example: '123456',
  })
  @IsDefined()
  @IsString()
  otpCode: string;

  @ApiProperty({
    description: 'Email address associated with the account.',
    example: 'user@example.com',
  })
  @IsDefined()
  @IsEmail()
  email: string;
}
