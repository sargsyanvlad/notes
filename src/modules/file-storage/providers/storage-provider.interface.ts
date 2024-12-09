import { Readable } from 'stream';

import { FileStorageType, FileStore } from '../types';

export interface StorageProviderInterface {
  storageType: FileStorageType;
  uploadFile(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{ path: string; storage: string }>;
  downloadFile(storage: FileStore): Promise<Readable>;
}
