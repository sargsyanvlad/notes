import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { SpellCheckModule } from '../spellcheck/spellcheck.module';
import { Notes, NotesSchema } from './notes.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@ukitgroup/nestjs-config';
import { NotesConfig } from './notes.config';
// MongooseModule.forFeature([
//   { name: AFiCredentialUsernamePassword.name, schema: AFiCredentialUsernamePasswordSchema }
// ])
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
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
