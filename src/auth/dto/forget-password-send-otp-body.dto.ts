import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail } from 'class-validator';

export class ForgetPasswordSendOtpBodyDto {
  @ApiProperty({
    description: 'Email address for sending OTP.',
    example: 'user@example.com',
  })
  @IsDefined()
  @IsEmail()
  email: string;
}
