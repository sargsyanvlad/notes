import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class NotesAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    if (headers['x-api-key']) {
      return new AuthApiKeyGuard().canActivate(context);
    } else {
      const authGuardInstance = AuthGuard('jwt');
      const guard = new authGuardInstance();
      return guard.canActivate(context);
    }
  }
}

@Injectable()
export class AuthApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    request['user'] = {
      userId: apiKey,
      name: 'anonymous',
      role: 'restricted',
    };
    return validateApiKey(apiKey);
  }
}

const validateApiKey = function (apiKey: string): boolean {
  return apiKey === 'secretKey'; // This is a dummy implementation
};
