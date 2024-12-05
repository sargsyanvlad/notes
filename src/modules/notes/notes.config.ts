import { Config, Env } from '@ukitgroup/nestjs-config';
import { Transform } from '@ukitgroup/nestjs-config/transformer';
import { IsDefined } from '@ukitgroup/nestjs-config/validator';

export type RoleScopes = {
  title: number; // 1 || 0
  text: number;
};
export type RolesList = 'admin' | 'owner' | 'user';
export type Roles = Record<RolesList, { scopes: RoleScopes }>;

@Config('NOTES')
export class NotesConfig {
  @Env('VISIBILITY_SCOPES')
  @IsDefined()
  @Transform((value: string) => {
    try {
      return JSON.parse(value);
    } catch (_err) {
      return value;
    }
  })
  public readonly visibilityScopes: Roles;
}
