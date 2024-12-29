import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { DbModule } from 'src/db/db.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [DbModule, NotificationModule],
  providers: [JobService],
  controllers: [JobController],
})
export class JobModule {}
