import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { MESSAGE_TEXT_MAX_LENGTH } from '../constant/message-length.constant';

export class SendMessageDto {
  @IsDefined()
  @IsInt()
  receiverId: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(MESSAGE_TEXT_MAX_LENGTH)
  text: string;
}
