import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({
    description: 'The ID of the parent message (for reply threads).',
    example: '64a34e8f9b12345678abcdef',
  })
  @IsOptional()
  @IsMongoId()
  parent?: string;

  @ApiProperty({
    description: 'The ID of the user to whom the message is being sent.',
    example: 456,
  })
  @IsDefined()
  @IsInt()
  receiverId: number;

  @ApiProperty({
    description: 'The content of the message.',
    example: 'Hello! How are you?',
    maxLength: MESSAGE_TEXT_MAX_LENGTH,
  })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(MESSAGE_TEXT_MAX_LENGTH)
  text: string;
}
