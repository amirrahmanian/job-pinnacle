import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

export class JobIdParamDto {
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  jobId: number;
}
