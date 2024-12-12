import { IsDefined, IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpUserBodyDto {
  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  password: string;
}
