import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { EventModule } from 'src/event/event.module';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
  imports: [DbModule, EventModule],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
