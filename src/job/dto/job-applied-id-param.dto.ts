import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class JobAppliedIdParamDto {
  @ApiProperty({
    description: 'ID of the job application',
    example: 123,
  })
  @IsDefined()
  @Type(() => Number)
  jobAppliedId: number;
}
