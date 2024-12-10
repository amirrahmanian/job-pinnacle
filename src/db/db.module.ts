import { Module } from '@nestjs/common';
import { AdminRepository } from './repository/admin.repository';
import { CompanyRepository } from './repository/company.repository';
import { UserRepository } from './repository/user.repository';
import { JobRepository } from './repository/job.repository';

@Module({
  providers: [
    AdminRepository,
    CompanyRepository,
    UserRepository,
    JobRepository,
  ],
  exports: [AdminRepository, CompanyRepository, UserRepository, JobRepository],
})
export class DbModule {}
