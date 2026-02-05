import {
  BaseEventCalendar,
  BaseEventCalendarProps,
  CalendarEvent,
  CalendarViewMode,
} from "@/components/ui/base-event-calendar";
import { DefaultCalendarHeader } from "@/components/ui/event-calendar/calendar-header";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import React, { FC, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { EventRenderer } from "react-native-big-calendar";

export const defaultRenderEvent: EventRenderer = (
  event,
  touchableOpacityProps,
) => (
  <TouchableOpacity {...touchableOpacityProps} key={touchableOpacityProps.key}>
    <View className="flex-1 justify-center">
      <Text className="text-xs color-white" numberOfLines={1}>
        {event.title}
      </Text>
    </View>
  </TouchableOpacity>
);

export const defaultEventCellStyle = (event: CalendarEvent) => {
  const now = new Date();
  const isCurrent = event.start <= now && event.end >= now;

  return {
    backgroundColor: isCurrent ? "#06cdecff" : event.color || "#3b82f6",
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    borderTopWidth: 1,
    borderColor: "#000",
  };
};

interface EventCalendarProps extends Omit<
  BaseEventCalendarProps,
  "initialDate" | "viewMode"
> {
  className?: string;

  initialDate?: Date;
  viewMode?: CalendarViewMode;
}

export const EventCalendar: FC<EventCalendarProps> = ({
  className,

  initialDate: defaultInitialDate,
  date,
  onDateChange,
  viewMode: defaultViewMode,

  events,

  ...eventCalendarProps
}) => {
  const [viewMode, setViewMode] = useState<CalendarViewMode>(
    defaultViewMode ?? "day",
  );
  const [initialDate, setInitialDate] = useState<Date>(
    defaultInitialDate ?? new Date(),
  );

  const handleViewModeChange = (mode: CalendarViewMode) => {
    const targetDate = mode === "week" ? dayjs(date).weekday(0).toDate() : date;
    !dayjs(initialDate).isSame(targetDate, "day") && setInitialDate(targetDate);
    setViewMode(mode);
  };

  return (
    <View className={cn("flex-1", className)}>
      <DefaultCalendarHeader
        date={date}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      <BaseEventCalendar
        {...eventCalendarProps}
        initialDate={initialDate}
        date={date}
        onDateChange={onDateChange}
        viewMode={viewMode}
        events={events}
        renderEvent={defaultRenderEvent}
        eventCellStyle={defaultEventCellStyle}
      />
    </View>
  );
};
