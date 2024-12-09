import { UserJwtPayload } from '../auth/types';
import { UserRolesList } from '../users/types';

export type RoleScopes = {
  title: number; // 1 || 0
  text: number;
};

export type Roles = Record<UserRolesList, { scopes: RoleScopes }>;

export type NotesBaseReq = {
  user: UserJwtPayload;
  apiKey?: string;
  role: UserRolesList;
};
