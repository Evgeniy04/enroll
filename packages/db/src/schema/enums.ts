import { pgEnum } from "drizzle-orm/pg-core";

export const transmissionEnum = pgEnum("transmission_type", [
  "manual",
  "automatic",
]);
