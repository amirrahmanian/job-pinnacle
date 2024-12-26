import { Message } from 'src/db/schema/message.schema';

export interface IReadMessageEvent {
  _id: Message['_id'];
  senderId: Message['senderId'];
  receiverId: Message['receiverId'];
  readAt: Message['readAt'];
}
