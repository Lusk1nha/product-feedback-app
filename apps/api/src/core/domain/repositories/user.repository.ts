import { User } from '../entities/user.entity';

export interface UserRepository {
  findAll(): Promise<any[]>;
  create(user: User): Promise<User>;
}
