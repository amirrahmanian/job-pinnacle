import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { CompanyEntity } from '../entity/company.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CompanyRepository extends BaseRepository<CompanyEntity> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(CompanyEntity, dataSource);
  }
}
