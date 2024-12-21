import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

export class CompanyIdParamDto {
  /**
   * Company ID
   * @example 1
   */
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  companyId: number;
}
