import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from './base.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message extends Base {
  @Prop()
  sender: string;

  @Prop()
  receiver: string;

  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
