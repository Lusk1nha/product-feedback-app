import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from '../drizzle.provider';
import { schema, DatabaseSchema } from '../schemas';
import { IUserRepository } from 'src/core/domain/repositories/user.repository';
import { User } from 'src/core/domain/entities/user.entity';
import { Email } from 'src/core/domain/value-objects/email.vo';
import { UserMapper } from 'src/infra/mappers/user.mapper';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

@Injectable()
export class UserDrizzleRepository implements IUserRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<DatabaseSchema>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.db.select().from(schema.users);
    return users.map(UserMapper.toDomain);
  }

  async findByEmail(emailVo: Email): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, emailVo.getValue()))
      .limit(1);

    return user ? UserMapper.toDomain(user) : null;
  }

  async create(user: User): Promise<User> {
    const [created] = await this.db
      .insert(schema.users)
      .values(UserMapper.toPersistence(user))
      .returning();

    return UserMapper.toDomain(created);
  }
}
