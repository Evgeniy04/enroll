import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";
import { specialist } from "./specialist";

export const drivingInstructorProfile = pgTable("driving_instructor_profile", {
  specialistId: uuid("specialist_id")
    .primaryKey()
    .references(() => specialist.id, { onDelete: "cascade" }),
  address: text(),
  addressNote: text("address_note"),
  drivingExperienceStart: date("driving_experience_start"),
  workExperienceStart: date("work_experience_start"),
  ...timestamps,
});
