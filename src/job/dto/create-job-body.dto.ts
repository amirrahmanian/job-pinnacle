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
  /**
   * Job Collaboration Time From
   * @example 2000-10-10 08:00:00
   */
  @IsOptional()
  @IsDateString()
  from?: string;

  /**
   * Job Collaboration Time TO
   * @example 2000-10-10 18:00:00
   */
  @IsOptional()
  @IsDateString()
  to?: string;
}

export class CreateJobBodyJobExprienceDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(40)
  min?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(40)
  max?: number;
}

export class CreateJobBodyJobSaleryDto {
  @IsOptional()
  @IsInt()
  min?: number;

  @IsOptional()
  @IsInt()
  max?: number;
}

export class CreateJobBodyDto {
  @IsDefined()
  @IsBoolean()
  immediate: boolean;

  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsEnum(JobCityEnum)
  city: JobCityEnum;

  @IsDefined()
  @IsArray()
  @IsEnum(JobColaborationTypeEnum, { each: true })
  collaborationType: JobColaborationTypeEnum[];

  @IsOptional()
  @IsObject()
  @Type(() => CreateJobBodyCollaborationTimeDto)
  collaborationTime?: CreateJobBodyCollaborationTimeDto;

  @IsOptional()
  @IsObject()
  @Type(() => CreateJobBodyJobExprienceDto)
  experience?: CreateJobBodyJobExprienceDto;

  @IsDefined()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(JobGenderEnum)
  gender?: JobGenderEnum;

  @IsOptional()
  @IsArray()
  @IsEnum(JobDutySystemEnum, { each: true })
  dutySystem?: JobDutySystemEnum[];

  @IsOptional()
  @IsArray()
  @IsEnum(JobEducationEnum, { each: true })
  education?: JobEducationEnum[];

  @IsOptional()
  @IsObject()
  @Type(() => CreateJobBodyJobSaleryDto)
  salery?: CreateJobBodyJobSaleryDto;
}
