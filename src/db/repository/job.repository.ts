import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { JobEntity } from '../entity/job.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class JobRepository extends BaseRepository<JobEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(JobEntity, dataSource);
  }
}
