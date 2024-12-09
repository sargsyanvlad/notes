import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiSecurity,
} from '@nestjs/swagger';

import { NotesAuthGuard } from '../auth/auth.guard';

import { FileUploadDto } from './dto/file-upload.dto';
import { FileUploadService } from './upload.service';
import { NotesBaseReq } from '../notes/types';

@UseGuards(NotesAuthGuard)
@ApiSecurity('APIToken')
@ApiBearerAuth()
@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: FileUploadDto,
  })
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: NotesBaseReq,
  ) {
    return this.fileUploadService.upload(file, req.user.userId);
  }
}
