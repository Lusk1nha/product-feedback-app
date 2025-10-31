import { HttpStatus } from '@nestjs/common';
import { CoreBaseError } from './core-base.error';

export class NotFoundError extends CoreBaseError<{
  resource: string;
  id?: number | string;
}> {
  constructor(resource: string, id?: number | string) {
    super(
      'NOT_FOUND',
      `Resource not found: ${resource}${id ? ` with ID ${id}` : ''}`,
      HttpStatus.NOT_FOUND,
      { resource, id },
    );
  }
}
