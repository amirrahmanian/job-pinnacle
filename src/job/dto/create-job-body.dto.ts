import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { JobColaborationTypeEnum } from 'src/common/enum/job-colaboration-type.enum';
import { JobDutySystemEnum } from 'src/common/enum/job-duty-system.enum';
import { JobEducationEnum } from 'src/common/enum/job-education.enum';
import { JobGenderEnum } from 'src/common/enum/job-gender.enum';

export class CreateJobBodyCollaborationTimeDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}

export class CreateJobBodyJobExprienceDto {
  @IsOptional()
  @IsInt()
  min: number;

  @IsOptional()
  @IsInt()
  max: number;
}

export class CreateJobBodyDto {
  @IsDefined()
  @IsString()
  title: string;

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
}
