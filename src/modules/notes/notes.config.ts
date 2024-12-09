import { Config, Env } from '@ukitgroup/nestjs-config';
import { Transform } from '@ukitgroup/nestjs-config/transformer';
import { IsDefined } from '@ukitgroup/nestjs-config/validator';

import { Roles } from './types';

@Config('NOTES')
export class NotesConfig {
  @Env('VISIBILITY_SCOPES')
  @IsDefined()
  @Transform((value: string) => {
    try {
      return JSON.parse(value);
    } catch (err) {
      console.warn(err);
      return value;
    }
  })
  public readonly visibilityScopes: Roles;
}
