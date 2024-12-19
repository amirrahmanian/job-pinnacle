import { IsDefined, IsPhoneNumber } from 'class-validator';

export class RegisterFounderSendOtpBodyDto {
  @IsDefined()
  @IsPhoneNumber()
  cellphone: string;
}
