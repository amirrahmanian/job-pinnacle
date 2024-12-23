import { InjectDataSource } from '@nestjs/typeorm';
import { BaseRepository } from './base.repository';
import { DataSource } from 'typeorm';
import { JobAppliedEntity } from '../entity/job-applied.entity';

export class JobAppliedRepository extends BaseRepository<JobAppliedEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(JobAppliedEntity, dataSource);
  }

  async insertOrIgnore(
    entity: Pick<JobAppliedEntity, 'jobId' | 'jobSeekerId' | 'status'>,
  ) {
    return this.createQueryBuilder()
      .insert()
      .into(JobAppliedEntity)
      .values({
        jobId: entity.jobId,
        jobSeekerId: entity.jobSeekerId,
        status: entity.status,
      })
      .orIgnore()
      .execute();
  }
}
