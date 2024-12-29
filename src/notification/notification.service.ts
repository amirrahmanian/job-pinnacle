import { Injectable } from '@nestjs/common';
import { NotificationRepository } from 'src/db/repository/notification.repository';
import { EventService } from 'src/event/event.service';
import { ISendNotification } from './interface/send-notification.interface';
import { UserPayload } from 'src/auth/type/user-payload.type';

@Injectable()
export class NotificationService {
  constructor(
    private notificationRepository: NotificationRepository,
    private eventService: EventService,
  ) {}

  async sendNotification(sendNotification: ISendNotification) {
    const insertNotificationResult =
      await this.notificationRepository.model.create({
        receiverId: sendNotification.receiverId,
        text: sendNotification.text,
      });

    this.eventService.emitNewNotification({
      _id: insertNotificationResult._id,
      receiverId: sendNotification.receiverId,
      text: sendNotification.text,
      createdAt: insertNotificationResult.createdAt,
    });

    return { _id: insertNotificationResult._id.toHexString() };
  }

  async getUserNotification(userPayload: UserPayload) {
    return await this.notificationRepository.model.find({
      receiverId: userPayload.userId,
    });
  }
}
