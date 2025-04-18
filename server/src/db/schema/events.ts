import { relations, sql } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'node:crypto';

export const events = sqliteTable('events', {
  id: text('id')
    .notNull()
    .$default(() => randomUUID())
    .primaryKey(),
  userId: text('user_id').notNull(),
  type: text('type').notNull(),
  payload: text('payload'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
