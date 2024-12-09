import { Inject, Injectable } from '@nestjs/common';

import { StorageProviderInterface } from '../file-storage/providers/storage-provider.interface';

@Injectable()
export class FileUploadService {
  constructor(
    @Inject('StorageService')
    private readonly storageService: StorageProviderInterface,
  ) {}

  public async upload(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{ path: string; storage: string }> {
    return this.storageService.uploadFile(file, userId);
  }
}
