import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@ukitgroup/nestjs-config';

import { SpellCheckModule } from '../spellcheck/spellcheck.module';

import { NotesConfig } from './notes.config';
import { NotesController } from './notes.controller';
import { Notes, NotesSchema } from './notes.schema';
import { NotesService } from './notes.service';

@Module({
  imports: [
    ConfigModule.forFeature([NotesConfig]),
    MongooseModule.forFeature([
      {
        name: Notes.name,
        schema: NotesSchema,
      },
    ]),
    SpellCheckModule,
  ],
  exports: [NotesService],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
