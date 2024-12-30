import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { UpdateJobAppliedBodyDto } from './dto/update-job-applied-status-body.dto';
import { JobAppliedIdParamDto } from './dto/job-applied-id-param.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @ApiBearerAuth()
  @Post(':companyId')
  @Private(UserRoleEnum.FOUNDER)
  @ApiOperation({
    summary: 'Create a new job',
    description: 'Create a job under a specific company.',
  })
  @ApiParam({
    name: 'companyId',
    description: 'The unique identifier of the company.',
    example: 123,
  })
  @ApiResponse({ status: 201, description: 'Job created successfully.' })
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

  @ApiBearerAuth()
  @Put(':jobId')
  @Private(UserRoleEnum.FOUNDER)
  @ApiOperation({
    summary: 'Update an existing job',
    description: 'Update job details.',
  })
  @ApiParam({
    name: 'jobId',
    description: 'The unique identifier of the job to update.',
    example: 456,
  })
  @ApiResponse({ status: 204, description: 'Job updated successfully.' })
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

  @ApiBearerAuth()
  @Delete(':jobId')
  @Private(UserRoleEnum.FOUNDER)
  @ApiOperation({
    summary: 'Delete a job',
    description: 'Remove a job by its ID.',
  })
  @ApiParam({
    name: 'jobId',
    description: 'The unique identifier of the job to delete.',
    example: 789,
  })
  @ApiResponse({ status: 204, description: 'Job deleted successfully.' })
  async deleteJob(
    @Param() jobIdParamDto: JobIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.deleteJob(jobIdParamDto, userPayload);
  }

  @ApiBearerAuth()
  @Post(':jobId/apply')
  @Private(UserRoleEnum.JOB_SEEKER)
  @ApiOperation({
    summary: 'Apply for a job',
    description: 'Apply for a specific job.',
  })
  @ApiParam({
    name: 'jobId',
    description: 'The unique identifier of the job to apply for.',
    example: 1234,
  })
  @ApiResponse({
    status: 201,
    description: 'Job application submitted successfully.',
  })
  async applyJob(
    @Param() jobIdParamDto: JobIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.applyJob(jobIdParamDto, userPayload);
  }

  @ApiBearerAuth()
  @Post(':jobId/save')
  @Private(UserRoleEnum.JOB_SEEKER)
  @ApiOperation({
    summary: 'Save a job',
    description: 'Save a specific job to your list.',
  })
  @ApiParam({
    name: 'jobId',
    description: 'The unique identifier of the job to save.',
    example: 5678,
  })
  @ApiResponse({ status: 201, description: 'Job saved successfully.' })
  async saveJob(
    @Param() jobIdParamDto: JobIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.saveJob(jobIdParamDto, userPayload);
  }

  @Get(':jobId/info')
  @Public()
  @ApiOperation({
    summary: 'Get job information',
    description: 'Retrieve details about a specific job.',
  })
  @ApiParam({
    name: 'jobId',
    description: 'The unique identifier of the job.',
    example: 4321,
  })
  @ApiResponse({
    status: 200,
    description: 'Job information retrieved successfully.',
  })
  async getJobInfo(@Param() jobIdParamDto: JobIdParamDto) {
    return this.jobService.getJobInfo(jobIdParamDto);
  }

  @Get()
  @Public()
  @ApiOperation({
    summary: 'Get filtered jobs',
    description:
      'Retrieve a list of jobs based on filters like title, industry, and city.',
  })
  @ApiQuery({
    name: 'title',
    description: 'Filter jobs by title.',
    required: false,
    example: 'Software Engineer',
  })
  @ApiQuery({
    name: 'industry',
    description: 'Filter jobs by industry.',
    required: false,
    example: 'web',
  })
  @ApiQuery({
    name: 'city',
    description: 'Filter jobs by city.',
    required: false,
    example: 'tehran',
  })
  @ApiResponse({
    status: 200,
    description: 'Filtered job list retrieved successfully.',
  })
  async getFilteredJob(@Query() getFilterJobQueryDto: GetFilterJobQueryDto) {
    return this.jobService.getFilteredJob(getFilterJobQueryDto);
  }

  @ApiBearerAuth()
  @Patch(':jobAppliedId')
  @Private(UserRoleEnum.FOUNDER)
  @ApiOperation({
    summary: 'Update job application status',
    description: 'Update the status of a job application.',
  })
  @ApiParam({
    name: 'jobAppliedId',
    description: 'The unique identifier of the job application.',
    example: 91011,
  })
  @ApiResponse({
    status: 204,
    description: 'Job application status updated successfully.',
  })
  async updateJobApplied(
    @Body() updateJobAppliedBodyDto: UpdateJobAppliedBodyDto,
    @Param() jobAppliedIdParamDto: JobAppliedIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.updateJobApplied(
      updateJobAppliedBodyDto,
      jobAppliedIdParamDto,
      userPayload,
    );
  }

  @ApiBearerAuth()
  @Patch(':jobAppliedId/cancel')
  @Private(UserRoleEnum.JOB_SEEKER)
  @ApiOperation({
    summary: 'Cancel job application',
    description: 'Cancel a previously submitted job application.',
  })
  @ApiParam({
    name: 'jobAppliedId',
    description: 'The unique identifier of the job application.',
    example: 121314,
  })
  @ApiResponse({
    status: 204,
    description: 'Job application cancelled successfully.',
  })
  async cancelJobApplied(
    @Param() jobAppliedIdParamDto: JobAppliedIdParamDto,
    @User() userPayload: UserPayload,
  ) {
    return this.jobService.cancelJobApplied(jobAppliedIdParamDto, userPayload);
  }
}
