import { EmptyUsernameError } from '../errors/empty-username.error';
import { InvalidUsernameError } from '../errors/invalid-username.error';
import { Email } from '../value-objects/email.vo';
import { BaseEntity } from './base.entity';

export interface UserProps {
  username: string;
  email: Email;
  avatarUrl?: string | null;
}

export class User extends BaseEntity {
  private readonly props: UserProps;

  private constructor(
    props: UserProps,
    base?: { id?: number; createdAt?: Date; updatedAt?: Date },
  ) {
    super(base);
    this.props = {
      ...props,
    };
  }

  static create(props: UserProps): User {
    if (!props?.username?.length) {
      throw new EmptyUsernameError();
    }

    if (props.username.trim().length < 3) {
      throw new InvalidUsernameError(props.username);
    }

    return new User(props);
  }

  static rebuild(data: {
    id: number;
    username: string;
    email: string;
    avatarUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    const emailVo = Email.from(data.email);

    return new User(
      {
        username: data.username,
        email: emailVo,
        avatarUrl: data.avatarUrl ?? null,
      },
      { id: data.id, createdAt: data.createdAt, updatedAt: data.updatedAt },
    );
  }

  static fromProps(
    props: UserProps,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,
  ): User {
    return new User(props, { id, createdAt, updatedAt });
  }

  get username(): string {
    return this.props.username;
  }

  get email(): Email {
    return this.props.email;
  }

  get avatarUrl(): string | null | undefined {
    return this.props.avatarUrl;
  }

  withUsername(newUsername: string): User {
    const newProps: UserProps = {
      ...this.props,
      username: newUsername,
    };
    return User.fromProps(newProps, this.id, this.createdAt, new Date());
  }

  withAvatar(url: string | null): User {
    const newProps: UserProps = {
      ...this.props,
      avatarUrl: url,
    };
    return User.fromProps(newProps, this.id, this.createdAt, new Date());
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email.getValue(),
      avatarUrl: this.avatarUrl ?? null,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
