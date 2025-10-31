import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { CoreBaseError } from 'src/core/errors/core-base.error';

@Catch(CoreBaseError)
export class CoreExceptionFilter implements ExceptionFilter {
  catch(exception: CoreBaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        code: exception.code,
        message: exception.message,
        details: exception.details,
        timestamp: exception.timestamp,
      });
  }
}
