export abstract class DomainBaseError<T = unknown> extends Error {
  public readonly code: string;
  public readonly details?: T;
  public readonly timestamp: Date;

  constructor(code: string, message: string, details?: T) {
    super(message);
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
    this.name = new.target.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
