import { DomainBaseError } from './domain-base.error';

export class InvalidEmailError extends DomainBaseError<{ email: string }> {
  constructor(email: string) {
    super('INVALID_EMAIL', `Invalid email: ${email}`, { email });
  }
}
