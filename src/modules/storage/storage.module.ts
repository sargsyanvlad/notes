import { Module } from '@nestjs/common';
import { FileUploadService } from './storage.service';
import { FileUploadController } from './storage.controller';

@Module({
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
