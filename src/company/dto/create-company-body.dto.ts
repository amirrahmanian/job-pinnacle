import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
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
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDefined()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsDefined()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
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

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateCompanyBodyLocationDto)
  location: CreateCompanyBodyLocationDto;

  @IsOptional()
  @IsUrl()
  webSite?: string;

  @IsDefined()
  @ValidateNested()
  @IsObject()
  @Type(() => CreateCompanyBodySizeDto)
  size: CreateCompanyBodySizeDto;

  @IsDefined()
  @IsArray()
  @IsEnum(CompanyIndustryEnum, { each: true })
  industry: CompanyIndustryEnum[];

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
