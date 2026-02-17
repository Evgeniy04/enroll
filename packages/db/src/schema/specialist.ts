import { sql } from "drizzle-orm";
import { boolean, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { activity } from "./activity";
import { user } from "./auth";
import { timestamps } from "./columns.helpers";

export const specialist = pgTable(
  "specialist",
  {
    id: uuid().defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    activityId: uuid("activity_id")
      .notNull()
      .references(() => activity.id),
    isActive: boolean("is_active").notNull().default(false),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("unique_active_per_user")
      .on(table.userId)
      .where(sql`is_active = true`),
    uniqueIndex("unique_activity_per_user").on(table.userId, table.activityId),
  ],
);
