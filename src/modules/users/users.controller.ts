import {
  Controller,
  Get,
  NotFoundException,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { NotesAuthGuard } from '../auth/auth.guard';
import { NotesService } from '../notes/notes.service';
import { NotesBaseReq } from '../notes/notes.controller';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly notesService: NotesService,
  ) {}

  @Get('me')
  @UseGuards(NotesAuthGuard)
  async getMe(@Req() req: NotesBaseReq) {
    const user = await this.usersService.findOne(req.user.userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const noteCount = this.notesService.getNoteCount(req.user.userId);
    return { ...user, noteCount };
  }
}
