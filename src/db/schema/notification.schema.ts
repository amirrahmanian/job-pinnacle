import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from './base.schema';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification extends Base {
  @Prop()
  receiverId: number;

  @Prop()
  text: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
