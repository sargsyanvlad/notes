import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

import { TransformExceptionFilter } from './transform.exception.filter';

@Catch(HttpException)
export class HttpExceptionFilter extends TransformExceptionFilter<HttpException> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(exception: HttpException, _host: ArgumentsHost): HttpException {
    return exception;
  }
}
