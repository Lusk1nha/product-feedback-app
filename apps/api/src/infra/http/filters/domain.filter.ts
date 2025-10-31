import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { DomainBaseError } from 'src/core/domain/errors/domain-base.error';

@Catch(DomainBaseError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainBaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.BAD_REQUEST).json({
      code: exception.code,
      message: exception.message,
      details: exception.details,
      timestamp: exception.timestamp,
    });
  }
}
