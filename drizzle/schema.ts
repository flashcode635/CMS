import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp, jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const universities = pgTable("universities", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  slug: text("slug").notNull().unique(),

  country: text("country").notNull(),

  description: text("description"),

  tuitionFee: integer("tuition_fee"),

  published: boolean("published").default(false).notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const users= pgTable("users", {
  
  id: uuid("id").defaultRandom().primaryKey(),

  email: text("email").notNull().unique(),

  password: text("password").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

export const countries = pgTable("countries", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  slug: text("slug").notNull().unique(),

  data: jsonb("data").notNull(),

  version: integer("version").notNull().default(1),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});