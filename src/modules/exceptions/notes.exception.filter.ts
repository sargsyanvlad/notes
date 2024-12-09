import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { NotesError } from '../../errors/notes.error';

import { TransformExceptionFilter } from './transform.exception.filter';

@Catch(NotesError)
export class NotesExceptionFilter extends TransformExceptionFilter<NotesError> {
  transform(exception: NotesError, host: ArgumentsHost): HttpException {
    const req = host.switchToHttp().getRequest();
    return new HttpException(
      {
        host: req.host,
        code: exception.code || 0,
        message: exception.message || 'NOTES ERROR',
        isInformative: !!exception.isInformative,
        status: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
