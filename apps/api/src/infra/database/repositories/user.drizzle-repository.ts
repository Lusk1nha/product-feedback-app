import { Injectable, Inject } from '@nestjs/common';
import { eq, type InferSelectModel } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from '../drizzle.provider';
import { schema, DatabaseSchema } from '../schemas'; // ⬅️ importa o schema e o tipo
import { UserRepository } from 'src/core/domain/repositories/user.repository';
import { User } from 'src/core/domain/entities/user.entity';
import { Email } from 'src/core/domain/value-objects/email.vo';

type UserModel = InferSelectModel<typeof schema.users>;

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

@Injectable()
export class UserDrizzleRepository implements UserRepository {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<DatabaseSchema>,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return await this.db.select().from(schema.users);
  }

  async findByEmail(emailVo: Email): Promise<User | null> {
    const email = emailVo.getValue();

    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);

    if (!user) {
      return null;
    }

    return User.fromBuilder({
      id: user.id,
      username: user.username,
      email: Email.create(user.email),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async create(user: User): Promise<User> {
    const email = user.email.getValue();

    const [created] = await this.db
      .insert(schema.users)
      .values({
        email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      })
      .returning();

    return User.fromBuilder({
      id: created.id,
      username: created.username,
      email: Email.create(created.email),
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }
}
