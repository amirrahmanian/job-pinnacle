import { InjectDataSource } from '@nestjs/typeorm';
import { FounderEntity } from '../entity/founder.entity';
import { BaseRepository } from './base.repository';
import { DataSource } from 'typeorm';

export class FounderRepository extends BaseRepository<FounderEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(FounderEntity, dataSource);
  }
}
