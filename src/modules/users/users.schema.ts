import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Users extends Document {
  createdAt: Date;
  updatedAt: Date;

  @Prop({ index: 1 })
  id: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  email: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
