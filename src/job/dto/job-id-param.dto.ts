import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt } from 'class-validator';

export class JobIdParamDto {
  @ApiProperty({
    description: 'ID of the job',
    example: 123,
  })
  @IsDefined()
  @IsInt()
  @Type(() => Number)
  jobId: number;
}
