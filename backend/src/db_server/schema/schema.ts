import { pgTable, serial, text, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  isweeb: boolean('isweeb').notNull().default(false),
});