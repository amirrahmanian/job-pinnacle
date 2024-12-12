import { DataSource } from 'typeorm';
import { SessionEntity } from '../entity/session.entity';
import { BaseRepository } from './base.repository';
import { InjectDataSource } from '@nestjs/typeorm';

export class SessionRepository extends BaseRepository<SessionEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(SessionEntity, dataSource);
  }
}
