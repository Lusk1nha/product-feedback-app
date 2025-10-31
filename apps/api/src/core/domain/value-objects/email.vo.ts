import { InvalidEmailError } from '../errors/invalid-email.error';

export class Email {
  private constructor(private readonly value: string) {}

  static from(value: string): Email {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new InvalidEmailError(value);
    }

    return new Email(value);
  }

  getValue(): string {
    return this.value;
  }
}
