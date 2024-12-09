import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as process from 'process';

import { JWTService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_AUTH_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [JWTService],
  providers: [JwtStrategy, JWTService],
})
export class AuthModule {}
