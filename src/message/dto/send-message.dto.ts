import {
  IsDefined,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { MESSAGE_TEXT_MAX_LENGTH } from '../constant/message-length.constant';

export class SendMessageDto {
  @IsOptional()
  @IsMongoId()
  parent?: string;

  @IsDefined()
  @IsInt()
  receiverId: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(MESSAGE_TEXT_MAX_LENGTH)
  text: string;
}
