import { Module } from '@nestjs/common';
import { CompanyRepository } from './repository/company.repository';
import { UserRepository } from './repository/user.repository';
import { JobRepository } from './repository/job.repository';
import { SessionRepository } from './repository/session.repository';
import { FounderRepository } from './repository/founder.repository';
import { JobSeekerRepository } from './repository/job-seeker.repository';
import { JobAppliedRepository } from './repository/job-applied.repository';
import { JobSavedRepository } from './repository/job-saved.repository';

@Module({
  providers: [
    CompanyRepository,
    UserRepository,
    JobRepository,
    SessionRepository,
    FounderRepository,
    JobSeekerRepository,
    JobAppliedRepository,
    JobSavedRepository,
  ],
  exports: [
    CompanyRepository,
    UserRepository,
    JobRepository,
    SessionRepository,
    FounderRepository,
    JobSeekerRepository,
    JobAppliedRepository,
    JobSavedRepository,
  ],
})
export class DbModule {}
