import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class GetMessagesDto extends PaginationDto {
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  userId: number;
}
