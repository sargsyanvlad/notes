import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { SpellCheckService } from '../spellcheck/spellcheck.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Notes } from './notes.schema';
import { NotesConfig } from './notes.config';
import { CreateNoteDto } from './dto/create.note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';

export type Note = {
  id: string;
  title: string;
  text: string;
  userId: string;
};

@Injectable()
export class NotesService {
  constructor(
    private readonly spellCheckService: SpellCheckService,
    @InjectModel(Notes.name) private readonly model: Model<Notes>,
    @Inject(NotesConfig) private readonly config: NotesConfig,
  ) {}

  private getVisibilityScope(role: string): any {
    if (role === 'admin') {
      return {};
    } else {
      return {
        ...this.config.visibilityScopes[role].scopes,
        createdAt: 0,
        updatedAt: 0,
        userId: 0,
        apiKey: 0,
        _id: 0,
        __v: 0,
      };
    }
  }

  public async createNote(
    createNoteDto: CreateNoteDto,
    user: { userId: string },
  ) {
    const { title, text } = createNoteDto;

    const isValid = await this.spellCheckService.checkSpelling(text);
    if (!isValid) {
      throw new BadRequestException('Spell check failed');
    }

    const id = uuid();
    const note = {
      id,
      title,
      text,
      userId: user.userId,
    };
    await this.model.create(note);
    return note;
  }

  public async findAll(role: string) {
    return this.model.find({}, this.getVisibilityScope(role)).exec();
    // TODO instead of using .getVisibilityScope() method here,  we can use mapper function to map the
    // TODO role to the visibility scope and check ownership of each note
  }
  public async findById(
    id: string,
    user: { userId: string; role: string },
  ): Promise<any> {
    const note = await this.model
      .findOne({ id }, { apiKey: 0, _id: 0, __v: 0 })
      .exec();
    if (note?.userId === user.userId) {
      return note;
    } else {
      const scopes = this.getVisibilityScope(user.role);
      return this.model.findOne({ id }, scopes).exec();
    }
  }

  public async updateNote(
    id: string,
    updateNoteDto: UpdateNoteDto,
    user: { userId: string; role: string },
  ): Promise<Note> {
    return this.model.findOneAndUpdate(
      { id, userId: user.userId },
      updateNoteDto,
      {
        returnDocument: 'after',
      },
    );
  }

  public async deleteNote(
    id: string,
    user: { userId: string; role: string },
  ): Promise<void> {
    if (user.role === 'admin') {
      // TODO NOT GOOD IDEA TO HARDCODE ROLE HERE
      await this.model.deleteOne({ id }).exec();
    }
    await this.model.deleteOne({ id, userId: user.userId }).exec();
  }

  public async getNoteCount(user: { userId: string; role: string }) {
    const { userId } = user;
    return this.model.aggregate([
      {
        $match: { userId },
      },
      {
        $group: {
          _id: '$userId',
          count: { $sum: 1 },
        },
      },
    ]);
  }
}
