import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginBodyDto {
  @ApiProperty({
    description: 'Email address of the user.',
    example: 'user@example.com',
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user.',
    example: 'password123',
  })
  @IsDefined()
  @IsString()
  password: string;
}
