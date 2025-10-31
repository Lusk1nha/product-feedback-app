import { HttpStatus } from '@nestjs/common';

export abstract class CoreBaseError<T = unknown> extends Error {
  public readonly code: string;
  public readonly details?: T;
  public readonly timestamp: Date;
  public readonly statusCode: HttpStatus;

  constructor(
    code: string,
    message: string,
    statusCode: HttpStatus,
    details?: T,
  ) {
    super(message);
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
    this.name = new.target.name;
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
