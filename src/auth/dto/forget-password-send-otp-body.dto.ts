import { IsDefined, IsEmail } from 'class-validator';

export class ForgetPasswordSendOtpBodyDto {
  @IsDefined()
  @IsEmail()
  email: string;
}
