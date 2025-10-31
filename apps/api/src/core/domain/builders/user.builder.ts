import { Email } from '../value-objects/email.vo';
import { User } from '../entities/user.entity';

export class UserBuilder {
  private username?: string;
  private email?: Email;
  private avatarUrl?: string;

  static create(): UserBuilder {
    return new UserBuilder();
  }

  withUsername(username: string): this {
    this.username = username;
    return this;
  }

  withEmail(email: string): this {
    this.email = Email.from(email);
    return this;
  }

  withAvatar(url: string): this {
    this.avatarUrl = url;
    return this;
  }

  build(): User {
    if (!this.username || !this.email) {
      throw new Error('Username and Email are required');
    }

    return User.create({
      username: this.username,
      email: this.email,
      avatarUrl: this.avatarUrl ?? null,
    });
  }
}
