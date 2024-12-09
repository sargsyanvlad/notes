import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'process';

import { UserJwtPayload } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_AUTH_SECRET,
    });
  }

  async validate(payload: Record<string, string>): Promise<UserJwtPayload> {
    return {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
  }
}
