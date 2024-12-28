import { Module } from '@nestjs/common';
import { CompanyRepository } from './repository/company.repository';
import { UserRepository } from './repository/user.repository';
import { JobRepository } from './repository/job.repository';
import { SessionRepository } from './repository/session.repository';
import { FounderRepository } from './repository/founder.repository';
import { JobSeekerRepository } from './repository/job-seeker.repository';
import { JobAppliedRepository } from './repository/job-applied.repository';
import { JobSavedRepository } from './repository/job-saved.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';
import { MessageRepository } from './repository/message.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [
    CompanyRepository,
    UserRepository,
    JobRepository,
    SessionRepository,
    FounderRepository,
    JobSeekerRepository,
    JobAppliedRepository,
    JobSavedRepository,
    MessageRepository,
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
    MessageRepository,
  ],
})
export class DbModule {}
