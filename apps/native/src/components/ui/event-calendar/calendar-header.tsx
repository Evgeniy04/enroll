import { CalendarViewMode } from "@/components/ui/base-event-calendar";
import { EventCalendarViewToggle } from "@/components/ui/event-calendar-view-toggle";
import { Text } from "@/components/ui/text";
import dayjs from "dayjs";
import React, { FC } from "react";
import { View } from "react-native";

interface CalendarHeaderProps {
  date: Date;
  viewMode: CalendarViewMode;
  onViewModeChange: (mode: CalendarViewMode) => void;
}

export const DefaultCalendarHeader: FC<CalendarHeaderProps> = ({
  date,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <>
      <View className="flex-row items-center justify-between p-5">
        <Text variant="large">{dayjs(date).format("MMMM YYYY")}</Text>
        <EventCalendarViewToggle value={viewMode} onChange={onViewModeChange} />
      </View>
    </>
  );
};
