import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * Base Class for every filter here
 */
export class TransformExceptionFilter<T extends Error>
  implements ExceptionFilter<T>
{
  private readonly logger = new Logger('EXCEPTION_FILTER');
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(exception: T, host: ArgumentsHost): HttpException {
    return new InternalServerErrorException();
  }

  catch(exception: T, host: ArgumentsHost) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { cause } = exception;
    let message = `Exception: ${exception.message}`;

    if (cause) {
      message = `${message} | ${(cause as any)?.stack || cause} `;
    }

    this.logger.error(message, exception);

    const transformedException = this.transform(exception, host);
    const responseCode = transformedException.getStatus();
    const responseMessage = transformedException.message;
    const response = {
      code: responseCode,
      message: responseMessage,
    };

    const transformedResponse = transformedException.getResponse();
    if (typeof transformedResponse === 'object') {
      Object.assign(response, transformedResponse);
    }

    return host
      .switchToHttp()
      .getResponse<Response>()
      .status(transformedException.getStatus())
      .json(response);
  }
}
