import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, PopulatedDoc, Types } from 'mongoose';
import { Base } from './base.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message extends Base {
  @Prop({ type: Types.ObjectId, ref: 'Message' })
  parent?: PopulatedDoc<Types.ObjectId & Message>;

  @Prop()
  senderId: number;

  @Prop()
  receiverId: number;

  @Prop()
  partitionKey: string;

  @Prop()
  text: string;

  @Prop()
  readAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
