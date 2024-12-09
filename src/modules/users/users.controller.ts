import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

import { NotesAuthGuard } from '../auth/auth.guard';
import { NotesService } from '../notes/notes.service';

import { LoginUserDto } from './dto/login.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { UsersService } from './users.service';
import { NotesBaseReq } from '../notes/types';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly notesService: NotesService,
  ) {}

  @Get('me')
  @ApiSecurity('APIToken')
  @ApiBearerAuth()
  @UseGuards(NotesAuthGuard)
  public async getMe(@Req() req: NotesBaseReq) {
    const user = await this.usersService.getOwnProfile(req.user.userId);
    const notesCount = await this.notesService.getNoteCount(req.user);
    return { user, notesCount };
  }

  @Post('register')
  public async register(@Body() registerUserDto: RegisterUserDto) {
    await this.usersService.register(registerUserDto);
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }
}
