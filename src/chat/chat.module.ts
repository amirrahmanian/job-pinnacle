import { Module } from '@nestjs/common';
import { ChatGetway } from './chat.getway';

@Module({
  providers: [ChatGetway],
})
export class ChatModule {}
