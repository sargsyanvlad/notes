import { Module } from '@nestjs/common';

import { StorageModule } from '../file-storage/file-sotrage.module';

import { FileUploadController } from './upload.controller';
import { FileUploadService } from './upload.service';

@Module({
  imports: [StorageModule],
  providers: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
