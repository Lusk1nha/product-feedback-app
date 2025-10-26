import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const permissionType = pgEnum('permission_type', [
  'read',
  'create',
  'update',
  'delete',
]);

export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey(),
  name: permissionType('name').notNull(),
  description: varchar('description').notNull(),
});
