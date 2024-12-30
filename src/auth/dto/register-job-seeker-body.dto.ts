import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterJobSeekerBodyDto {
  @ApiProperty({
    description: 'First name of the job seeker.',
    example: 'John',
  })
  @IsDefined()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the job seeker.',
    example: 'Doe',
  })
  @IsDefined()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Email address of the job seeker.',
    example: 'john.doe@example.com',
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the job seeker (minimum 8 characters).',
    example: 'securePassword123',
  })
  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;
}
