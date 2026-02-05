import { CALENDAR_CONSTANTS, getBigCalendarTheme } from "@/config";
import dayjs from "dayjs";
import { useColorScheme } from "nativewind";
import React, { FC } from "react";
import { Calendar, ICalendarEventBase } from "react-native-big-calendar";
import { CalendarContainerProps } from "react-native-big-calendar/build/components/CalendarContainer";

export type CalendarViewMode = "day" | "3days" | "week";

export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  color?: string;
  [key: string]: any;
}

export interface BaseEventCalendarProps extends CalendarContainerProps<ICalendarEventBase> {
  height: number;

  initialDate: Date;
  date: Date;
  onDateChange: (date: Date) => void;
  viewMode: CalendarViewMode;

  events: CalendarEvent[];
}

export const BaseEventCalendar: FC<BaseEventCalendarProps> = ({
  height,

  initialDate,
  date,
  onDateChange,
  viewMode,

  events,

  ...baseEventCalendarProps
}) => {
  const { colorScheme } = useColorScheme();
  const theme = getBigCalendarTheme(colorScheme ?? "light");

  const handleSwipeEnd = (targetDate: Date) => {
    !dayjs(date).isSame(targetDate, "day") && onDateChange(targetDate);
  };

  return (
    <Calendar
      {...baseEventCalendarProps}
      key={viewMode}
      locale="ru"
      date={initialDate}
      weekStartsOn={CALENDAR_CONSTANTS.FIRST_DAY}
      theme={theme}
      mode={viewMode}
      events={events}
      height={height}
      onSwipeEnd={handleSwipeEnd}
    />
  );
};
