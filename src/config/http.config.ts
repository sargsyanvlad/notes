import { Config, Env } from '@ukitgroup/nestjs-config';
import { Number } from '@ukitgroup/nestjs-config/types';

@Config('HTTP')
export class HttpConfig {
  @Env('PORT')
  @Number()
  public readonly port: number = 3000;
}
