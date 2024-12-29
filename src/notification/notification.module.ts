import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { DbModule } from 'src/db/db.module';
import { EventModule } from 'src/event/event.module';
import { NotificationController } from './notification.controller';

@Module({
  imports: [DbModule, EventModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
