import { FormatTimeOptions } from "@/components/ui/time-picker-field/time-picker-field.types";

export const TIME_FORMAT_CONFIG: FormatTimeOptions = {
  units: ["hours", "minutes"],
  labels: { hours: "", minutes: "" },
  separator: ":",
  unitSeparator: "",
  showZero: true,
};
