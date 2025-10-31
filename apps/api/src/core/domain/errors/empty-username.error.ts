import { DomainBaseError } from './domain-base.error';

export class EmptyUsernameError extends DomainBaseError {
  constructor() {
    super('EMPTY_USERNAME', 'Username cannot be empty');
  }
}
