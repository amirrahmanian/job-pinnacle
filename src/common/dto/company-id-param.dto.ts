import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

export class CompanyIdParamDto {
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  companyId: number;
}
