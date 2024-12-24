import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CompanyIndustryEnum } from 'src/common/enum/company-industry.enum';
import { JobCityEnum } from 'src/common/enum/job-city.enum';

export class GetFilterJobQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(CompanyIndustryEnum)
  industry?: CompanyIndustryEnum;

  @IsOptional()
  @IsEnum(JobCityEnum)
  city?: JobCityEnum;
}
