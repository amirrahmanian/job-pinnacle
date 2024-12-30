import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CompanyIndustryEnum } from 'src/common/enum/company-industry.enum';
import { JobCityEnum } from 'src/common/enum/job-city.enum';

export class GetFilterJobQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Title of the job to filter',
    example: 'Software Engineer',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Industry to filter jobs by',
    enum: CompanyIndustryEnum,
  })
  @IsOptional()
  @IsEnum(CompanyIndustryEnum)
  industry?: CompanyIndustryEnum;

  @ApiPropertyOptional({
    description: 'City to filter jobs by',
    enum: JobCityEnum,
  })
  @IsOptional()
  @IsEnum(JobCityEnum)
  city?: JobCityEnum;
}
