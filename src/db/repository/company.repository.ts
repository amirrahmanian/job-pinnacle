import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { CompanyEntity } from '../entity/company.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { JobEntity } from '../entity/job.entity';

@Injectable()
export class CompanyRepository extends BaseRepository<CompanyEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(CompanyEntity, dataSource);
  }

  async softDeleteWithRelatedData(companyId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.softDelete(JobEntity, {
        companyId,
      });

      await queryRunner.manager.softDelete(CompanyEntity, { id: companyId });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
