import { Config, Env } from '@ukitgroup/nestjs-config';
import { String } from '@ukitgroup/nestjs-config/types';

@Config('LOCAL_STORAGE')
export class LocalStorageConfig {
  @Env('PATH')
  @String()
  public readonly path: string = 'tmp';
}
