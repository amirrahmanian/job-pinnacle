import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JobRepository } from 'src/db/repository/job.repository';
import { CreateJobBodyDto } from './dto/create-job-body.dto';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { CompanyIdParamDto } from 'src/common/dto/company-id-param.dto';
import { CompanyEntity } from 'src/db/entity/company.entity';
import { CompanyRepository } from 'src/db/repository/company.repository';
import { JobIdParamDto } from './dto/job-id-param.dto';
import { JobEntity } from 'src/db/entity/job.entity';
import { UpdateJobBodyDto } from './dto/update-job-body.dto';
import { DeepPartial } from 'typeorm';
import { FounderRepository } from 'src/db/repository/founder.repository';
import { FounderEntity } from 'src/db/entity/founder.entity';
import { JobSavedRepository } from 'src/db/repository/job-saved.repository';
import { JobSeekerRepository } from 'src/db/repository/job-seeker.repository';
import { JobSeekerEntity } from 'src/db/entity/job-seeker.entity';
import { JobAppliedRepository } from 'src/db/repository/job-applied.repository';

@Injectable()
export class JobService {
  constructor(
    private founderRepository: FounderRepository,
    private jobRepository: JobRepository,
    private companyRepository: CompanyRepository,
    private jobSeekerRepository: JobSeekerRepository,
    private jobSavedRepository: JobSavedRepository,
    private jobAppliedRepository: JobAppliedRepository,
  ) {}

  async createJob(
    param: CompanyIdParamDto,
    body: CreateJobBodyDto,
    userPayload: UserPayload,
  ) {
    const founder: Pick<FounderEntity, 'id'> =
      await this.founderRepository.findOne({
        where: { userId: userPayload.userId },
        select: { id: true },
      });

    if (!founder) {
      throw new NotFoundException('founder.not_found');
    }

    const company: Pick<CompanyEntity, 'id' | 'founderId'> =
      await this.companyRepository.findOne({
        where: { id: param.companyId },
        select: { id: true, founderId: true },
      });

    if (!company) {
      throw new NotFoundException('company.not_found');
    }

    if (founder.id !== company.founderId) {
      throw new ForbiddenException();
    }

    const insertObj: DeepPartial<JobEntity> = {};

    if (body.collaborationTime) {
      insertObj.collaborationTime = {
        from: new Date(body.collaborationTime.from),
        to: new Date(body.collaborationTime.to),
      };
    }

    const insertResult = await this.jobRepository.insert({
      companyId: company.id,
      title: body.title,
      collaborationTime: insertObj.collaborationTime,
      collaborationType: body.collaborationType,
      description: body.description,
      dutySystem: body.dutySystem,
      education: body.education,
      experience: body.experience,
      gender: body.gender,
      company: { id: company.id },
    });

    const jobId: JobEntity['id'] = insertResult.generatedMaps[0].id;

    return { id: jobId };
  }

  async updateJob(
    param: JobIdParamDto,
    body: UpdateJobBodyDto,
    userPayload: UserPayload,
  ) {
    const job: Pick<JobEntity, 'id' | 'companyId'> =
      await this.jobRepository.findOne({
        where: { id: param.jobId },
        select: { id: true, companyId: true },
      });

    if (!job) throw new NotFoundException('job.not_found');

    const company: Pick<CompanyEntity, 'id' | 'founderId'> =
      await this.companyRepository.findOne({
        where: { id: job.companyId },
        select: { id: true, founderId: true },
      });

    if (!company) throw new NotFoundException('company.not_found');

    const founder: Pick<FounderEntity, 'id'> =
      await this.founderRepository.findOne({
        where: { userId: userPayload.userId },
        select: { id: true },
      });

    if (!founder) throw new NotFoundException('founder.not_found');

    if (founder.id !== company.founderId) {
      throw new ForbiddenException();
    }

    const updateObj: DeepPartial<JobEntity> = {};

    if (body.collaborationTime) {
      updateObj.collaborationTime = {
        from: new Date(body.collaborationTime.from),
        to: new Date(body.collaborationTime.to),
      };
    } else if (body.collaborationTime === null) {
      updateObj.collaborationTime = null;
    }

    await this.jobRepository.update(
      { id: job.id },
      {
        title: body.title,
        collaborationTime: updateObj.collaborationTime,
        collaborationType: body.collaborationType,
        description: body.description,
        dutySystem: body.dutySystem,
        education: body.education,
        experience: body.experience,
        gender: body.gender,
      },
    );
  }

  async deleteJob(param: JobIdParamDto, userPayload: UserPayload) {
    const job: Pick<JobEntity, 'id' | 'companyId'> =
      await this.jobRepository.findOne({
        where: { id: param.jobId },
        select: { id: true, companyId: true },
      });

    if (!job) throw new NotFoundException('job.not_found');

    const company: Pick<CompanyEntity, 'id' | 'founderId'> =
      await this.companyRepository.findOne({
        where: { id: job.companyId },
        select: { id: true, founderId: true },
      });

    if (!company) throw new NotFoundException('company.not_found');

    const founder: Pick<FounderEntity, 'id'> =
      await this.founderRepository.findOne({
        where: { userId: userPayload.userId },
        select: { id: true },
      });

    if (!founder) throw new NotFoundException('founder.not_found');

    if (founder.id !== company.founderId) {
      throw new ForbiddenException();
    }

    await this.jobRepository.softDelete({
      id: param.jobId,
    });
  }

  async saveJob(param: JobIdParamDto, userPayload: UserPayload) {
    const jobSeeker: Pick<JobSeekerEntity, 'id'> =
      await this.jobSeekerRepository.findOne({
        where: { userId: userPayload.userId },
      });

    if (!jobSeeker) throw new NotFoundException('jobSeeker.not_found');

    const job: Pick<JobEntity, 'id'> = await this.jobRepository.findOne({
      where: { id: param.jobId },
    });

    if (!job) throw new NotFoundException('job.not_found');

    await this.jobSavedRepository.insertOrIgnore({
      jobId: param.jobId,
      jobSeekerId: jobSeeker.id,
    });
  }

  async applieJob(param: JobIdParamDto, userPayload: UserPayload) {
    const jobSeeker: Pick<JobSeekerEntity, 'id'> =
      await this.jobSeekerRepository.findOne({
        where: { userId: userPayload.userId },
      });

    if (!jobSeeker) throw new NotFoundException('jobSeeker.not_found');

    const job: Pick<JobEntity, 'id'> = await this.jobRepository.findOne({
      where: { id: param.jobId },
    });

    if (!job) throw new NotFoundException('job.not_found');

    /**
     * TODO: check jobSeeker did not apply recently
     */

    /**
     * TODO: implement with kafka
     */

    await this.jobAppliedRepository.insertOrIgnore({
      jobId: param.jobId,
      jobSeekerId: jobSeeker.id,
    });
  }
}
