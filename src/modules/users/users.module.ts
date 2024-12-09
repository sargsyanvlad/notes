import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { NotesModule } from '../notes/notes.module';

import { UsersController } from './users.controller';
import { Users, UsersSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    AuthModule,
    NotesModule,
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
