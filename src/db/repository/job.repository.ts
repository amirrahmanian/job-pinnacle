import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { JobEntity } from '../entity/job.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GetFilterJobQueryDto } from 'src/job/dto/get-filter-job-query.dto';
import { CompanyEntity } from '../entity/company.entity';

@Injectable()
export class JobRepository extends BaseRepository<JobEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(JobEntity, dataSource);
  }

  async getFilteredJob(query: GetFilterJobQueryDto) {
    const dataQuery = this.createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .select([
        'job.id',
        'job.title',
        'job.city',
        'job.immediate',
        'job.createdAt',
        'job.collaborationType',
        'job.salery',
        'company.id',
        'company.name',
        'company.logo',
      ]);

    if (query.title) {
      dataQuery.andWhere('job.title ILIKE :title', {
        title: `%${query.title}%`,
      });
    }

    if (query.city) {
      dataQuery.andWhere('job.city = :city', { city: query.city });
    }

    if (query.industry) {
      dataQuery.andWhere('company.industry = :industry', {
        industry: query.industry,
      });
    }

    const totalQuery = this.createQueryBuilder('job').innerJoin(
      'job.company',
      'company',
    );

    if (query.title) {
      totalQuery.andWhere('job.title ILIKE :title', {
        title: `%${query.title}%`,
      });
    }
    if (query.city) {
      totalQuery.andWhere('job.city = :city', { city: query.city });
    }
    if (query.industry) {
      totalQuery.andWhere('company.industry = :industry', {
        industry: query.industry,
      });
    }

    const dataPromise: Promise<
      {
        id: JobEntity['id'];
        title: JobEntity['title'];
        city: JobEntity['city'];
        immediate: JobEntity['immediate'];
        salery?: JobEntity['salery'];
        createdAt: JobEntity['createdAt'];
        collaborationType: JobEntity['collaborationType'];
        company: {
          id: CompanyEntity['id'];
          name: CompanyEntity['id'];
          logo: CompanyEntity['id'];
        };
      }[]
    > = dataQuery
      .orderBy('job.createdAt', 'DESC')
      .offset(query.skip)
      .limit(query.limit)
      .getRawMany();

    const totalPromise = totalQuery.getCount();

    const result = await Promise.all([dataPromise, totalPromise]);

    return result;
  }
}
