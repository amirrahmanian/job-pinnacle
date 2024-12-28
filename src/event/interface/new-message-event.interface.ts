import { Message } from 'src/db/schema/message.schema';

export interface INewMessageEvent {
  _id: Message['_id'];
  senderId: Message['senderId'];
  receiverId: Message['receiverId'];
  text: Message['text'];
  createdAt: Message['createdAt'];
  parent?: Pick<Message, '_id' | 'text'>;
}
