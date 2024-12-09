export interface AccessTokenInfo {
  email: string;
  role: string;
  userId: string;
}

export interface UserJwtPayload {
  userId: string;
  name: string;
  role: string;
}
