import { Config, Env } from '@ukitgroup/nestjs-config';
import { String } from '@ukitgroup/nestjs-config/types';

@Config('AWS_S3_STORAGE')
export class S3Config {
  @Env('REGION')
  @String()
  public readonly region: string = 'us-east-1';

  @Env('ACCESS_KEY_ID')
  @String()
  public readonly accessKeyId: string;

  @Env('SECRET_ACCESS_KEY')
  @String()
  public readonly secretAccessKey: string;

  @Env('BUCKET')
  @String()
  public readonly bucket: string;
}
