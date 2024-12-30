import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsPhoneNumber } from 'class-validator';

export class RegisterFounderSendOtpBodyDto {
  @ApiProperty({
    description: 'Cellphone number of the founder.',
    example: '+1234567890',
  })
  @IsDefined()
  @IsPhoneNumber()
  cellphone: string;
}
