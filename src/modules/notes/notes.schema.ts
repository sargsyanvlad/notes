import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notes extends Document {
  createdAt: Date;
  updatedAt: Date;

  @Prop({ index: 1 })
  userId: string;

  @Prop({ index: 1 })
  apiKey: string;

  @Prop({ index: 1 })
  id: string;

  @Prop()
  text: string;

  @Prop()
  title: string;
}

export const NotesSchema = SchemaFactory.createForClass(Notes);
