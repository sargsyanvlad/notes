import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './users.schema';
import { Model } from 'mongoose';

export type User = { id: number; name: string; role?: string };

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private readonly model: Model<Users>) {}

  public async findOne(userId: string) {
    return this.model.findOne({ id: userId });
  }
}
