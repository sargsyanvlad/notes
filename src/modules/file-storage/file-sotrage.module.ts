import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@ukitgroup/nestjs-config';

import { S3Config } from './providers/aws/aws.storage.config';
import { AwsStorageService } from './providers/aws/aws.storage.service';
import { LocalStorageConfig } from './providers/local/local.storage.config';
import { LocalStorageService } from './providers/local/local.storage.service';
import { StorageProviderInterface } from './providers/storage-provider.interface';
import { FileStorageType, fileStorageType } from './types';

@Module({
  imports: [ConfigModule.forFeature([S3Config, LocalStorageConfig])],
  providers: [
    {
      provide: 'StorageService',
      useFactory: storageFactory,
      inject: [ConfigService, S3Config, LocalStorageConfig],
    },
  ],
  exports: ['StorageService'],
})
export class StorageModule {}

function storageFactory(
  configService: ConfigService,
  s3Config: S3Config,
  localStorageConfig: LocalStorageConfig,
): StorageProviderInterface {
  const storageType: FileStorageType =
    configService.getOrThrow<FileStorageType>('STORAGE_TYPE');

  switch (storageType) {
    case 'local': {
      return new LocalStorageService(localStorageConfig);
    }
    case 'aws': {
      return new AwsStorageService(s3Config);
    }
    default: {
      throw new Error(`STORAGE TYPE SHOULD BE ONE OF ${fileStorageType}`);
    }
  }
}
