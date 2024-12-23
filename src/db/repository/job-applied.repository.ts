import { InjectDataSource } from '@nestjs/typeorm';
import { BaseRepository } from './base.repository';
import { DataSource } from 'typeorm';
import { JobAppliedEntity } from '../entity/job-applied.entity';

export class JobAppliedRepository extends BaseRepository<JobAppliedEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(JobAppliedEntity, dataSource);
  }

  async insertOrIgnore(
    entity: Pick<JobAppliedEntity, 'jobId' | 'jobSeekerId'>,
  ) {
    return this.createQueryBuilder()
      .insert()
      .into(JobAppliedEntity)
      .values({
        jobId: entity.jobId,
        jobSeekerId: entity.jobSeekerId,
      })
      .orIgnore()
      .execute();
  }
}
