import { Config, Env } from '@ukitgroup/nestjs-config';
import { String } from '@ukitgroup/nestjs-config/types';

@Config('SPELL_CHECK_AXIOS_CLIENT')
export class SpellcheckClientAxiosConfig {
  @Env('BASE_URL')
  @String()
  public readonly baseUrl: string;
}
