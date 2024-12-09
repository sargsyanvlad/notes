export const fileStorageType = ['local', 'aws'];
export type FileStorageType = (typeof fileStorageType)[number];

export interface FileStore {
  key: string;
  storageType: FileStorageType;
}

export type FileUploadProps = {
  extension: string;
  key: string;
  filePath: string;
};
