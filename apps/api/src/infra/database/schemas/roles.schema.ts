import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const roleType = pgEnum('role_type', ['user', 'admin']);

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: roleType('name').notNull(),
  description: varchar('description').notNull(),
});
