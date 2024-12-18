import { InjectDataSource } from '@nestjs/typeorm';
import { BaseRepository } from './base.repository';
import { DataSource } from 'typeorm';
import { JobSeekerEntity } from '../entity/job-seeker.entity';

export class JobSeekerRepository extends BaseRepository<JobSeekerEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(JobSeekerEntity, dataSource);
  }
}
