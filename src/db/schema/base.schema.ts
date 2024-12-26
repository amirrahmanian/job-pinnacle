import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export abstract class Base {
  _id: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop()
  deletedAt?: Date;
}
