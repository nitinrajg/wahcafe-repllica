import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const menuCategories = pgTable('menu_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const menuItems = pgTable(
  'menu_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => menuCategories.id, { onDelete: 'cascade' }),
    subcategory: text('subcategory'),
    name: text('name').notNull(),
    description: text('description'),
    isVeg: boolean('is_veg'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => [uniqueIndex('menu_items_category_name').on(t.categoryId, t.name)],
);

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(), // markdown
  coverImage: text('cover_image'),
  author: text('author').notNull().default('LE CHÂTEAU'),
  category: text('category').default('Corporate Catering Bangalore'),
  tags: text('tags').array().default([]),
  publishedAt: timestamp('published_at').notNull(),
  status: text('status').notNull().default('published'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const enquiries = pgTable(
  'enquiries',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    formType: text('form_type').notNull(), // 'customize-menu' | 'contact'
    firstName: text('first_name').notNull(),
    lastName: text('last_name').notNull(),
    email: text('email').notNull(),
    phone: text('phone').notNull(),
    message: text('message'),
    status: text('status').notNull().default('new'),
    sourcePath: text('source_path'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => [
    index('enquiries_created_at').on(t.createdAt),
    index('enquiries_status').on(t.status),
  ],
);

export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  lastLoginAt: timestamp('last_login_at'),
});

export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => adminUsers.id, { onDelete: 'cascade' }),
    tokenHash: text('token_hash').notNull().unique(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => [index('sessions_user_id').on(t.userId)],
);

export const galleryImages = pgTable('gallery_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  src: text('src').notNull(),
  alt: text('alt').notNull().default(''),
  caption: text('caption'),
  section: text('section'), // 'crockery', 'kiosk', 'team', 'ready-food', 'relishing', 'vehicles', 'infrastructure'
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
});
