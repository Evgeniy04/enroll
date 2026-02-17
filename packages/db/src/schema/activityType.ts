import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const activityType = pgTable("activity_type", {
  id: uuid().defaultRandom().primaryKey(),
  slug: text().notNull().unique(),
  ...timestamps,
});
