import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as process from 'process';
import { Readable } from 'stream';
import { v4 as uuidV4 } from 'uuid';

import { FileStore, FileUploadProps } from '../../types';
import { StorageProviderInterface } from '../storage-provider.interface';

import { LocalStorageConfig } from './local.storage.config';

@Injectable()
export class LocalStorageService implements StorageProviderInterface {
  private readonly storageDirectory: string;
  public readonly storageType = 'local';

  constructor(
    @Inject(LocalStorageConfig)
    private readonly config: LocalStorageConfig,
  ) {
    this.storageDirectory = path.join(process.cwd(), this.config.path);
    this.ensureDirectoryExists(this.storageDirectory);
  }

  private async ensureDirectoryExists(directoryPath: string): Promise<void> {
    try {
      await fs.access(directoryPath, fs.constants.F_OK);
    } catch (_error) {
      console.warn(_error);
      await fs.mkdir(directoryPath, { recursive: true });
    }
  }

  private genFileName(userId: string, extension: string): string {
    return `files/${Buffer.from(userId, 'utf8').toString('hex')}/${uuidV4()}${extension}`;
  }

  private prepareFileProps(
    file: Express.Multer.File,
    userId: string,
  ): FileUploadProps {
    const extension = path.extname(file.originalname).toLowerCase();
    const key = this.genFileName(userId, extension);
    const filePath = path.join(this.storageDirectory, key);
    return {
      extension,
      key,
      filePath,
    };
  }

  public async uploadFile(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{ path: string; storage: string }> {
    const { filePath, key } = this.prepareFileProps(file, userId);
    await this.ensureDirectoryExists(path.dirname(filePath));
    await fs.writeFile(filePath, file.buffer);

    return { path: key, storage: this.storageType };
  }

  public async downloadFile(documentStore: FileStore): Promise<Readable> {
    try {
      if (documentStore.storageType !== this.storageType) {
        throw new BadRequestException(
          `Storage type should be ${this.storageType}`,
        );
      }
      await fs.access(documentStore.key, fs.constants.F_OK);
      return createReadStream(documentStore.key);
    } catch (error) {
      console.log('error ', error);
      throw new NotFoundException('No file to download');
    }
  }
}
