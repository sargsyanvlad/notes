import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { TransformExceptionFilter } from './transform.exception.filter';

type AnonymousError = Error & {
  code?: number;
  status?: number;
};

@Catch()
export class UnknownExceptionFilter extends TransformExceptionFilter<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(exception: AnonymousError, host: ArgumentsHost): HttpException {
    return new InternalServerErrorException({
      code: exception.code || 0,
      message: "I'm a teapot",
      isInformative: false,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}
