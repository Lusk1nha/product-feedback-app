import { User } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';

export interface UserRepository {
  findAll(): Promise<any[]>;
  findByEmail(email: Email): Promise<User | null>;
  create(user: User): Promise<User>;
}
