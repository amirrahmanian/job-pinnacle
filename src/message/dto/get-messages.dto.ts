import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetMessagesDto extends PaginationDto {
  @ApiProperty({
    description: 'The ID of the user whose messages are being retrieved.',
    example: 123,
  })
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  userId: number;
}
