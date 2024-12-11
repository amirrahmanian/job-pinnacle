import { Module } from '@nestjs/common';
import { CompanyRepository } from './repository/company.repository';
import { UserRepository } from './repository/user.repository';
import { JobRepository } from './repository/job.repository';

@Module({
  providers: [CompanyRepository, UserRepository, JobRepository],
  exports: [CompanyRepository, UserRepository, JobRepository],
})
export class DbModule {}
