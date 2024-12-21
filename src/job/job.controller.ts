import { Body, Controller, Param, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { UserRoleEnum } from 'src/common/enum/user-role.enum';
import { User } from 'src/auth/decorator/user.decorator';
import { Private } from 'src/auth/decorator/private.decorator';
import { CompanyIdParamDto } from 'src/common/dto/company-id-param.dto';
import { CreateJobBodyDto } from './dto/create-job-body.dto';
import { UserPayload } from 'src/auth/type/user-payload.type';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post(':companyId')
  @Private(UserRoleEnum.FOUNDER)
  createJob(
    @Param() companyIdParamDto: CompanyIdParamDto,
    @Body() createJobBodyDto: CreateJobBodyDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.createJob(
      companyIdParamDto,
      createJobBodyDto,
      userPayload,
    );
  }
}
