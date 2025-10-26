import {
  pgTable,
  text,
  integer,
  timestamp,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const feedbacks = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 150 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category').notNull(),
  status: varchar('status').notNull().default('suggestion'),
  upvotes: integer('upvotes').notNull().default(0),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
