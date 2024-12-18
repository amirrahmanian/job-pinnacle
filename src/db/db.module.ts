import { Module } from '@nestjs/common';
import { CompanyRepository } from './repository/company.repository';
import { UserRepository } from './repository/user.repository';
import { JobRepository } from './repository/job.repository';
import { SessionRepository } from './repository/session.repository';
import { FounderRepository } from './repository/founder.repository';
import { JobSeekerRepository } from './repository/job-seeker.repository';

@Module({
  providers: [
    CompanyRepository,
    UserRepository,
    JobRepository,
    SessionRepository,
    FounderRepository,
    JobSeekerRepository,
  ],
  exports: [
    CompanyRepository,
    UserRepository,
    JobRepository,
    SessionRepository,
    FounderRepository,
    JobSeekerRepository,
  ],
})
export class DbModule {}
