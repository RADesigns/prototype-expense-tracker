import { numeric, pgEnum, pgTable, serial, text, index, varchar, timestamp, date } from 'drizzle-orm/pg-core';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from "zod";
// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text('title').notNull(),
  amount: numeric('amount', { precision: 12, scale: 2 }).notNull(),
  name: varchar('name', { length: 256 }),
  date: date("date").notNull(),
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

// Schema for inserting a user - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {message: "Amount must be a valid monetary value"})
});
// Schema for selecting a Expenses - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);