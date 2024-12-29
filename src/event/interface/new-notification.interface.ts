import { Notification } from 'src/db/schema/notification.schema';

export interface INewNotificationEvent {
  _id: Notification['_id'];
  receiverId: Notification['receiverId'];
  text: Notification['text'];
  createdAt: Notification['createdAt'];
}
