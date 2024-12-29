import { Model } from 'mongoose';
import { Notification } from '../schema/notification.schema';
import { BaseRepository } from './message.repository';
import { InjectModel } from '@nestjs/mongoose';

export class NotificationRepository extends BaseRepository<Notification> {
  constructor(@InjectModel(Notification.name) model: Model<Notification>) {
    super(model);
  }
}
