import {
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { v4 as uuidV4 } from 'uuid';

import { FileStore, FileUploadProps } from '../../types';
import { StorageProviderInterface } from '../storage-provider.interface';

import { S3Config } from './aws.storage.config';

@Injectable()
export class AwsStorageService implements StorageProviderInterface {
  public readonly storageType = 'aws';
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor(
    @Inject(S3Config)
    private readonly config: S3Config,
  ) {
    this.s3 = new S3Client([
      {
        region: this.config.region,
        credentials: {
          accessKeyId: this.config.accessKeyId,
          secretAccessKey: this.config.secretAccessKey,
        },
      },
    ]);
    this.bucket = this.config.bucket;
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{ path: string; storage: string }> {
    const { key } = this.prepareFileProps(file, userId);

    const params: PutObjectCommandInput = {
      Key: key,
      Body: file.buffer,
      Bucket: this.bucket,
    };

    const command = new PutObjectCommand(params);

    try {
      await this.s3.send(command);
      return { path: key, storage: this.storageType };
    } catch (error) {
      console.warn(error);
      throw new HttpException('Failed to upload file', 409);
    }
  }

  async downloadFile(documentStore: FileStore): Promise<Readable> {
    try {
      if (documentStore.storageType !== this.storageType) {
        throw new HttpException(
          `Storage type should be ${this.storageType}`,
          409,
        );
      }
      const key = this.extractKeyFromUrl(documentStore.key);

      const params: GetObjectCommandInput = {
        Bucket: this.bucket,
        Key: key,
      };

      const command = new GetObjectCommand(params);

      const fileObject = await this.s3.send(command);

      if (!fileObject.Body) {
        throw new HttpException('No file to download', 409);
      }

      return fileObject.Body as Readable;
    } catch (error) {
      console.warn(error);
      throw new HttpException(`Failed to download file`, 409);
    }
  }

  private getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
  }

  private genFileName(userId: string, extension: string): string {
    return `documents/${Buffer.from(userId, 'utf8').toString('hex')}/${uuidV4()}.${extension}`;
  }

  private extractKeyFromUrl(fileKey: string): string {
    return fileKey.split(`${this.bucket}/`)[1];
  }

  private prepareFileProps(
    file: Express.Multer.File,
    userId: string,
  ): FileUploadProps {
    const extension = this.getFileExtension(file.originalname);
    const key = this.genFileName(userId, extension);
    return {
      extension,
      key,
      filePath: key,
    };
  }
}
