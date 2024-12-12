import { Module } from '@nestjs/common';
import { CompanyRepository } from './repository/company.repository';
import { UserRepository } from './repository/user.repository';
import { JobRepository } from './repository/job.repository';
import { SessionRepository } from './repository/session.repository';

@Module({
  providers: [
    CompanyRepository,
    UserRepository,
    JobRepository,
    SessionRepository,
  ],
  exports: [
    CompanyRepository,
    UserRepository,
    JobRepository,
    SessionRepository,
  ],
})
export class DbModule {}
