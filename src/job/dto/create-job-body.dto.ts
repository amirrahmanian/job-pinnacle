import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { JobCityEnum } from 'src/common/enum/job-city.enum';
import { JobColaborationTypeEnum } from 'src/common/enum/job-colaboration-type.enum';
import { JobDutySystemEnum } from 'src/common/enum/job-duty-system.enum';
import { JobEducationEnum } from 'src/common/enum/job-education.enum';
import { JobGenderEnum } from 'src/common/enum/job-gender.enum';

export class CreateJobBodyCollaborationTimeDto {
  @ApiPropertyOptional({
    description: 'Job collaboration time start',
    example: '2000-10-10 08:00:00',
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    description: 'Job collaboration time end',
    example: '2000-10-10 18:00:00',
  })
  @IsOptional()
  @IsDateString()
  to?: string;
}

export class CreateJobBodyJobExprienceDto {
  @ApiPropertyOptional({
    description: 'Minimum years of experience required',
    example: 2,
    minimum: 1,
    maximum: 40,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(40)
  min?: number;

  @ApiPropertyOptional({
    description: 'Minimum years of experience required',
    example: 2,
    minimum: 1,
    maximum: 40,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(40)
  max?: number;
}

export class CreateJobBodyJobSaleryDto {
  @ApiPropertyOptional({
    description: 'Minimum salary offered',
    example: 50000,
  })
  @IsOptional()
  @IsInt()
  min?: number;

  @ApiPropertyOptional({
    description: 'Maximum salary offered',
    example: 10000000,
  })
  @IsOptional()
  @IsInt()
  max?: number;
}

export class CreateJobBodyDto {
  @ApiProperty({
    description: 'Whether the job is immediate',
    example: true,
  })
  @IsDefined()
  @IsBoolean()
  immediate: boolean;

  @ApiProperty({
    description: 'Job title',
    example: 'Software Engineer',
  })
  @IsDefined()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'City where the job is located',
    enum: JobCityEnum,
  })
  @IsDefined()
  @IsEnum(JobCityEnum)
  city: JobCityEnum;

  @ApiProperty({
    description: 'Types of job collaboration',
    enum: JobColaborationTypeEnum,
    isArray: true,
  })
  @IsDefined()
  @IsArray()
  @IsEnum(JobColaborationTypeEnum, { each: true })
  collaborationType: JobColaborationTypeEnum[];

  @ApiPropertyOptional({
    description: 'Collaboration time details',
    type: CreateJobBodyCollaborationTimeDto,
  })
  @IsOptional()
  @IsObject()
  @Type(() => CreateJobBodyCollaborationTimeDto)
  collaborationTime?: CreateJobBodyCollaborationTimeDto;

  @ApiPropertyOptional({
    description: 'Experience requirements for the job',
    type: CreateJobBodyJobExprienceDto,
  })
  @IsOptional()
  @IsObject()
  @Type(() => CreateJobBodyJobExprienceDto)
  experience?: CreateJobBodyJobExprienceDto;

  @ApiProperty({
    description: 'Job description',
    example: 'We are looking for a skilled software engineer...',
  })
  @IsDefined()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Preferred gender for the job',
    enum: JobGenderEnum,
  })
  @IsOptional()
  @IsEnum(JobGenderEnum)
  gender?: JobGenderEnum;

  @ApiPropertyOptional({
    description: 'Duty systems for the job',
    enum: JobDutySystemEnum,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(JobDutySystemEnum, { each: true })
  dutySystem?: JobDutySystemEnum[];

  @ApiPropertyOptional({
    description: 'Educational qualifications required',
    enum: JobEducationEnum,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(JobEducationEnum, { each: true })
  education?: JobEducationEnum[];

  @ApiPropertyOptional({
    description: 'Salary range offered',
    type: CreateJobBodyJobSaleryDto,
  })
  @IsOptional()
  @IsObject()
  @Type(() => CreateJobBodyJobSaleryDto)
  salery?: CreateJobBodyJobSaleryDto;
}
