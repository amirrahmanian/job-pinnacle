import { Model } from 'mongoose';
import { Message } from '../schema/message.schema';
import { InjectModel } from '@nestjs/mongoose';

export class BaseRepository<T> {
  constructor(public model: Model<T>) {}
}

export class MessageRepository extends BaseRepository<Message> {
  constructor(@InjectModel(Message.name) model: Model<Message>) {
    super(model);
  }
}
