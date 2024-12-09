import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Req,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

import { NotesAuthGuard } from '../auth/auth.guard';

import { CreateNoteDto } from './dto/create.note.dto';
import { UpdateNoteDto } from './dto/update.note.dto';
import { NotesService } from './notes.service';
import { NotesBaseReq } from './types';

@UseGuards(NotesAuthGuard)
@ApiSecurity('APIToken')
@ApiBearerAuth()
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post('/')
  public async create(
    @Body() createNoteDto: CreateNoteDto,
    @Req() req: NotesBaseReq,
  ) {
    return this.notesService.createNote(createNoteDto, req.user);
  }

  @Get('/')
  public async findAll(@Req() req: NotesBaseReq) {
    return this.notesService.findAll(req.user.role);
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string, @Req() req: NotesBaseReq) {
    const note = await this.notesService.findById(id, req.user);
    if (!note) {
      throw new NotFoundException();
    }
    return note;
  }

  @Put('/:id')
  public update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req: NotesBaseReq,
  ) {
    return this.notesService.updateNote(id, updateNoteDto, req.user);
  }

  @Delete('/:id')
  public remove(@Param('id') id: string, @Req() req: NotesBaseReq) {
    return this.notesService.deleteNote(id, req.user);
  }
}
