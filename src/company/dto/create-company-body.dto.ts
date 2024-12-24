import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CompanyIndustryEnum } from 'src/common/enum/company-industry.enum';
import { CompanyOwnershipTypeEnum } from 'src/common/enum/company-ownership-type.enum';

export class CreateCompanyBodyLocationDto {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsInt()
  @Min(-180)
  @Max(180)
  longitude?: number;
}

export class CreateCompanyBodySizeDto {
  @IsDefined()
  @IsInt()
  min: number;

  @IsDefined()
  @IsInt()
  max: number;
}

export class CreateCompanyBodyDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateCompanyBodyLocationDto)
  location?: CreateCompanyBodyLocationDto;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsDefined()
  @ValidateNested()
  @IsObject()
  @Type(() => CreateCompanyBodySizeDto)
  size: CreateCompanyBodySizeDto;

  @IsDefined()
  @IsEnum(CompanyIndustryEnum)
  industry: CompanyIndustryEnum;

  /**
   * EstablishmentYear Date
   * @example "1991-01-05 00:00:00"
   */
  @IsDefined()
  @IsDateString()
  establishmentYear: string;

  @IsDefined()
  @IsEnum(CompanyOwnershipTypeEnum)
  ownershipType: CompanyOwnershipTypeEnum;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  about: string;
}
