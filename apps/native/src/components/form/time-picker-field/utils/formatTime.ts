import {
  FormatTimeOptions,
  TimeProps,
  TimeUnit,
} from "@/components/form/time-picker-field/time-picker-field.types";

const DEFAULT_LABELS: Record<TimeUnit, string> = {
  days: "д",
  hours: "ч",
  minutes: "мин",
  seconds: "с",
};

export const formatTime = (
  time: TimeProps,
  {
    units = ["days", "hours", "minutes", "seconds"],
    labels = DEFAULT_LABELS,
    separator = " : ",
    unitSeparator = " ",
    padLength = 2,
    showZero = false,
  }: FormatTimeOptions = {},
): string => {
  return units
    .map((unit) => {
      const value = time[unit];

      if (value === undefined) return null;
      if (!showZero && value === 0) return null;

      const label = labels[unit] ?? DEFAULT_LABELS[unit];

      return `${value.toString().padStart(padLength, "0")}${unitSeparator}${label}`;
    })
    .filter(Boolean)
    .join(separator);
};
