import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File) {
    const filePath = join(__dirname, '..', 'uploads', file.originalname);
    const writeStream = createWriteStream(filePath);
    writeStream.write(file.buffer);
    return { filePath };
  }
}
