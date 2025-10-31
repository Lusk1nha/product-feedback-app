import { User } from 'src/core/domain/entities/user.entity';
import { schema } from '../database/schemas';

import { toDate } from '../utils/data-converter.util';

type RawUser = typeof schema.users.$inferSelect;
type InsertUser = typeof schema.users.$inferInsert;

export class UserMapper {
  static toDomain(raw: RawUser): User {
    const createdAt = toDate(raw.createdAt);
    const updatedAt = toDate(raw.updatedAt);

    return User.rebuild({
      id: raw.id,
      username: raw.username,
      email: raw.email,
      avatarUrl: raw.avatarUrl ?? null,
      createdAt: createdAt ?? new Date(),
      updatedAt: updatedAt ?? createdAt ?? new Date(),
    });
  }

  static toPersistence(user: User): InsertUser {
    return {
      username: user.username,
      email: user.email.getValue(),
      avatar_url: user.avatarUrl ?? null,
    } as InsertUser;
  }
}
