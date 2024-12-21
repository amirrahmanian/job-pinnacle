import { Injectable, NotFoundException } from '@nestjs/common';
import { JobRepository } from 'src/db/repository/job.repository';
import { CreateJobBodyDto } from './dto/create-job-body.dto';
import { UserPayload } from 'src/auth/type/user-payload.type';
import { CompanyIdParamDto } from 'src/common/dto/company-id-param.dto';
import { CompanyEntity } from 'src/db/entity/company.entity';
import { CompanyRepository } from 'src/db/repository/company.repository';

@Injectable()
export class JobService {
  constructor(
    private jobRepository: JobRepository,
    private companyRepository: CompanyRepository,
  ) {}

  async createJob(
    param: CompanyIdParamDto,
    body: CreateJobBodyDto,
    userPayload: UserPayload,
  ) {
    const company: Pick<CompanyEntity, 'id'> =
      await this.companyRepository.findOne({
        where: { id: param.companyId, userId: userPayload.userId },
        select: { id: true },
      });

    if (!company) {
      throw new NotFoundException('company.not_found');
    }

    const insertResualt = await this.jobRepository.insert({
      title: body.title,
      collaborationTime: body.collaborationTime,
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
}
