import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId } from 'class-validator';

export class ReadMessageDto {
  @ApiProperty({
    description: 'The ID of the message to mark as read.',
    example: '64a34e8f9b12345678abcdef',
  })
  @IsDefined()
  @IsMongoId()
  _id: string;
}
