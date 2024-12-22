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

@Injectable()
export class JobService {
  constructor(
    private founderRepository: FounderRepository,
    private jobRepository: JobRepository,
    private companyRepository: CompanyRepository,
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
    const founder: Pick<FounderEntity, 'id'> =
      await this.founderRepository.findOne({
        where: { userId: userPayload.userId },
        select: { id: true },
      });

    if (!founder) throw new NotFoundException('founder.not_found');

    const job: Pick<JobEntity, 'id' | 'companyId'> =
      await this.jobRepository.findOne({
        where: { id: param.jobId },
        select: { id: true, companyId: true },
      });

    if (!job) throw new NotFoundException('job.not_found');

    const company: Pick<CompanyEntity, 'id'> =
      await this.companyRepository.findOne({
        where: { founderId: founder.id },
        select: { id: true },
      });

    if (!company) throw new NotFoundException('company.not_found');

    if (company.id !== job.companyId) {
      throw new ForbiddenException();
    }

    const updateObj: DeepPartial<JobEntity> = {};

    if (body.collaborationTime !== null) {
      updateObj.collaborationTime = {
        from: new Date(body.collaborationTime.from),
        to: new Date(body.collaborationTime.to),
      };
    } else {
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
    const founder: Pick<FounderEntity, 'id'> =
      await this.founderRepository.findOne({
        where: { userId: userPayload.userId },
        select: { id: true },
      });

    if (!founder) throw new NotFoundException('founder.not_found');

    const job: Pick<JobEntity, 'id' | 'companyId'> =
      await this.jobRepository.findOne({
        where: { id: param.jobId },
        select: { id: true, companyId: true },
      });

    if (!job) throw new NotFoundException('job.not_found');

    const company: Pick<CompanyEntity, 'id'> =
      await this.companyRepository.findOne({
        where: { founderId: founder.id },
        select: { id: true },
      });

    if (!company) throw new NotFoundException('company.not_found');

    if (company.id !== job.companyId) {
      throw new ForbiddenException();
    }

    await this.jobRepository.softDelete({
      id: param.jobId,
    });
  }
}
