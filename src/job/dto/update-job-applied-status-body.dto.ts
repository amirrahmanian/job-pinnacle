import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsIn } from 'class-validator';
import { JobAppliedStatusEnum } from 'src/common/enum/job-applied-status.enum';

export class UpdateJobAppliedBodyDto {
  @ApiProperty({
    description: 'Status of the job application',
    enum: JobAppliedStatusEnum,
    example: JobAppliedStatusEnum.HIRED,
  })
  @IsDefined()
  @IsIn([
    JobAppliedStatusEnum.INTERVIEW,
    JobAppliedStatusEnum.HIRED,
    JobAppliedStatusEnum.REJECTED,
  ])
  status: JobAppliedStatusEnum;
}
