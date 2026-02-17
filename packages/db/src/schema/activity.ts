import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const activity = pgTable("activity", {
  id: uuid().defaultRandom().primaryKey(),
  slug: text().notNull().unique(),
});
