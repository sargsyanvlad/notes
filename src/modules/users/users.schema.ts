import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Users extends Document {
  createdAt: Date;
  updatedAt: Date;

  @Prop({ index: 1 })
  id: string;

  @Prop({ index: 1 })
  name: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
