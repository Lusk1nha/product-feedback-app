export class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error('Invalid email address');
    }

    return new Email(value);
  }

  getValue(): string {
    return this.value;
  }
}
