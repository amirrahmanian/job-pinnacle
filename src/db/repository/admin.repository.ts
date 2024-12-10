import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { AdminEntity } from '../entity/admin.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AdminRepository extends BaseRepository<AdminEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(AdminEntity, dataSource);
  }
}
