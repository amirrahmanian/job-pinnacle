import { InjectDataSource } from '@nestjs/typeorm';
import { JobsavedEntity } from '../entity/job-saved.entity';
import { BaseRepository } from './base.repository';
import { DataSource } from 'typeorm';

export class JobSavedRepository extends BaseRepository<JobsavedEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(JobsavedEntity, dataSource);
  }

  async insertOrIgnore(entity: Pick<JobsavedEntity, 'jobId' | 'jobSeekerId'>) {
    return this.createQueryBuilder()
      .insert()
      .into(JobsavedEntity)
      .values({
        jobId: entity.jobId,
        jobSeekerId: entity.jobSeekerId,
      })
      .orIgnore()
      .execute();
  }
}
