import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({
    description: 'Address of the company.',
    example: '123 Main St, Springfield',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'Latitude coordinate of the company location.',
    example: 37.7749,
    minimum: -90,
    maximum: 90,
  })
  @IsOptional()
  @IsInt()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate of the company location.',
    example: -122.4194,
    minimum: -180,
    maximum: 180,
  })
  @IsOptional()
  @IsInt()
  @Min(-180)
  @Max(180)
  longitude?: number;
}

export class CreateCompanyBodySizeDto {
  @ApiProperty({
    description: 'Minimum size of the company.',
    example: 10,
  })
  @IsDefined()
  @IsInt()
  min: number;

  @ApiProperty({
    description: 'Maximum size of the company.',
    example: 50,
  })
  @IsDefined()
  @IsInt()
  max: number;
}

export class CreateCompanyBodyDto {
  @ApiProperty({
    description: 'Name of the company.',
    example: 'Tech Corp',
  })
  @IsDefined()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Location details of the company.',
    type: CreateCompanyBodyLocationDto,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateCompanyBodyLocationDto)
  location?: CreateCompanyBodyLocationDto;

  @ApiPropertyOptional({
    description: 'Company website URL.',
    example: 'https://techcorp.com',
  })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({
    description: 'Size range of the company.',
    type: CreateCompanyBodySizeDto,
  })
  @IsDefined()
  @ValidateNested()
  @IsObject()
  @Type(() => CreateCompanyBodySizeDto)
  size: CreateCompanyBodySizeDto;

  @ApiProperty({
    description: 'Industry of the company.',
    enum: CompanyIndustryEnum,
  })
  @IsDefined()
  @IsEnum(CompanyIndustryEnum)
  industry: CompanyIndustryEnum;

  @ApiProperty({
    description: 'Year of establishment of the company.',
    example: '1991-01-05',
  })
  @IsDefined()
  @IsDateString()
  establishmentYear: string;

  @ApiProperty({
    description: 'Ownership type of the company.',
    enum: CompanyOwnershipTypeEnum,
  })
  @IsDefined()
  @IsEnum(CompanyOwnershipTypeEnum)
  ownershipType: CompanyOwnershipTypeEnum;

  @ApiProperty({
    description: 'About the company.',
    example: 'We are a leading tech company.',
  })
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  about: string;
}
