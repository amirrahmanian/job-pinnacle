import { Injectable } from '@nestjs/common';
import { MessageRepository } from 'src/db/repository/message.repository';
import { EventService } from 'src/event/event.service';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private eventService: EventService,
  ) {}
}
