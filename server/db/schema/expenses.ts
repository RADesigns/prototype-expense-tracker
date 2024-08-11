import { numeric, pgEnum, pgTable, serial, text, index, varchar, timestamp } from 'drizzle-orm/pg-core';

// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  name: varchar('name', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
}, (expenses) => {
  return {
    nameIndex: index('name_idx').on(expenses.userId),
  }
});

/* export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  countryId: integer('country_id').references(() => countries.id),
  popularity: popularityEnum('popularity'),
}); */