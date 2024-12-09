import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as process from 'process';

import { AccessTokenInfo } from './types';

@Injectable()
export class JWTService {
  public createToken(tokenInfo: AccessTokenInfo): string {
    const secret = process.env.JWT_AUTH_SECRET;
    return jwt.sign(tokenInfo, secret, {
      expiresIn: process.env.AUTH_SECRET_EXPIRES_IN || 60000,
    });
  }
}
