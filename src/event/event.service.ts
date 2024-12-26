import { Injectable, Logger } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { INewMessageEvent } from './interface/new-message-event.interface';
import { IReadMessageEvent } from './interface/reade-message-event.interface';

@Injectable()
export class EventService {
  constructor(private eventGetway: EventGateway) {}

  async emitNewMessage(event: INewMessageEvent) {
    try {
      this.eventGetway.server
        .to(event.senderId.toString())
        .to(event.receiverId.toString())
        .emit('message.new', event);
    } catch (err) {
      Logger.error(err);
    }
  }

  async emitReadMessage(event: IReadMessageEvent) {
    try {
      this.eventGetway.server
        .to(event.senderId.toString())
        .emit('message.read', event);
    } catch (err) {
      Logger.error(err);
    }
  }
}
