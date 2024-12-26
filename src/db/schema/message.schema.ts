import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from './base.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message extends Base {
  @Prop()
  senderId: string;

  @Prop()
  receiverId: string;

  @Prop()
  text: string;

  @Prop()
  readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
