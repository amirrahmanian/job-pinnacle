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
import { UserEntity } from 'src/db/entity/user.entity';
import { UserRepository } from 'src/db/repository/user.repository';
import { UpdateJobBodyDto } from './dto/update-job-body.dto';
import { DeepPartial } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    private userRepository: UserRepository,
    private jobRepository: JobRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async createJob(
    param: CompanyIdParamDto,
    body: CreateJobBodyDto,
    userPayload: UserPayload,
  ) {
    const user: Pick<UserEntity, 'id'> = await this.userRepository.findOne({
      where: { id: userPayload.userId },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('user.not_found');
    }

    const company: Pick<CompanyEntity, 'id' | 'userId'> =
      await this.companyRepository.findOne({
        where: { id: param.companyId, userId: userPayload.userId },
        select: { id: true, userId: true },
      });

    if (!company) {
      throw new NotFoundException('company.not_found');
    }

    if (user.id !== company.userId) {
      throw new ForbiddenException();
    }

    const insertObj: DeepPartial<JobEntity> = {};

    if (body.collaborationTime) {
      insertObj.collaborationTime = {
        from: new Date(body.collaborationTime.from),
        to: new Date(body.collaborationTime.to),
      };
    }

    const insertResualt = await this.jobRepository.insert({
      userId: userPayload.userId,
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

    const jobId = insertResualt.generatedMaps[0].id;

    return { id: jobId };
  }

  async updateJob(
    param: JobIdParamDto,
    body: UpdateJobBodyDto,
    userPayload: UserPayload,
  ) {
    const job: Pick<JobEntity, 'id' | 'userId'> =
      await this.jobRepository.findOne({
        where: { id: param.jobId },
        select: { id: true, userId: true },
      });

    if (!job) {
      throw new NotFoundException('job.not_found');
    }

    if (userPayload.userId !== job.userId) {
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
    const job: Pick<JobEntity, 'id' | 'userId'> =
      await this.jobRepository.findOne({
        where: { id: param.jobId },
        select: { id: true, userId: true },
      });

    if (!job) throw new NotFoundException('job.not_found');

    if (job.userId !== userPayload.userId) throw new ForbiddenException();

    const deleteResualt = this.jobRepository.softDelete({
      id: param.jobId,
    });

    const deleted = !!deleteResualt;

    return deleted;
  }
}
