import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  role: text('role').default('read_only'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const heroStatements = pgTable('hero_statements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  ctaText: text('cta_text').notNull(),
  ctaLink: text('cta_link').notNull(),
  ctaIconName: text('cta_icon_name').notNull(),
  ctaVariant: text('cta_variant').notNull(),
  order: integer('order').notNull(),
});

export const coreValues = pgTable('core_values', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    iconName: text('icon_name').notNull(),
    explanation: text('explanation').notNull(),
    order: integer('order').notNull(),
});

export const pillars = pgTable('pillars', {
    id: text('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    link: text('link').notNull(),
    iconName: text('icon_name').notNull(),
    order: integer('order').notNull(),
});
