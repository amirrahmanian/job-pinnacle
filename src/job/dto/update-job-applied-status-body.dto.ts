import { IsDefined, IsIn } from 'class-validator';
import { JobAppliedStatusEnum } from 'src/common/enum/job-applied-status.enum';

export class UpdateJobAppliedBodyDto {
  @IsDefined()
  @IsIn([
    JobAppliedStatusEnum.INTERVIEW,
    JobAppliedStatusEnum.HIRED,
    JobAppliedStatusEnum.REJECTED,
  ])
  status: JobAppliedStatusEnum;
}
