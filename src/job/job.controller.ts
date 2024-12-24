import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { JobService } from './job.service';
import { UserRoleEnum } from 'src/common/enum/user-role.enum';
import { User } from 'src/auth/decorator/user.decorator';
import { Private } from 'src/auth/decorator/private.decorator';
import { CompanyIdParamDto } from 'src/common/dto/company-id-param.dto';
import { CreateJobBodyDto } from './dto/create-job-body.dto';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { JobIdParamDto } from './dto/job-id-param.dto';
import { UpdateJobBodyDto } from './dto/update-job-body.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import { GetFilterJobQueryDto } from './dto/get-filter-job-query.dto';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Post(':companyId')
  @Private(UserRoleEnum.FOUNDER)
  async createJob(
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

  @Put(':jobId')
  @Private(UserRoleEnum.FOUNDER)
  async updateJob(
    @Param() jobIdParamDto: JobIdParamDto,
    @Body() updateJobBodyDto: UpdateJobBodyDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.updateJob(
      jobIdParamDto,
      updateJobBodyDto,
      userPayload,
    );
  }

  @Delete(':jobId')
  @Private(UserRoleEnum.FOUNDER)
  async deleteJob(
    @Param() jobIdParamDto: JobIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.deleteJob(jobIdParamDto, userPayload);
  }

  @Post(':jobId/apply')
  @Private(UserRoleEnum.JOB_SEEKER)
  async applyJob(
    @Param() jobIdParamDto: JobIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.applyJob(jobIdParamDto, userPayload);
  }

  @Post(':jobId/save')
  @Private(UserRoleEnum.JOB_SEEKER)
  async saveJob(
    @Param() jobIdParamDto: JobIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.saveJob(jobIdParamDto, userPayload);
  }

  @Get(':jobId/info')
  @Public()
  async getJobInfo(@Param() jobIdParamDto: JobIdParamDto) {
    return this.jobService.getJobInfo(jobIdParamDto);
  }

  @Get()
  @Public()
  async getFilteredJob(@Query() getFilterJobQueryDto: GetFilterJobQueryDto) {
    return this.jobService.getFilteredJob(getFilterJobQueryDto);
  }
}
