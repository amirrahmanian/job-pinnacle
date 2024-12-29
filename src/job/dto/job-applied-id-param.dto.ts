import { Type } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class JobAppliedIdParamDto {
  @IsDefined()
  @Type(() => Number)
  jobAppliedId: number;
}
