import { BaseEntity } from './base.entity';
import { Email } from '../value-objects/email.vo';

export interface UserProps {
  id?: number;
  username: string;
  email: Email;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends BaseEntity {
  private readonly props: UserProps;

  private constructor(props: UserProps) {
    super();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  static fromBuilder(props: UserProps): User {
    return new User(props);
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }

  get avatarUrl() {
    return this.props.avatarUrl;
  }
}
