import { EventCalendarViewToggle } from '@/components/ui/event-calendar-view-toggle';
import { CalendarHeaderProps } from '@/components/ui/event-calendar/event-calendar.types';
import { Text } from '@/components/ui/text';
import dayjs from 'dayjs';
import React, { FC } from "react";
import { View } from "react-native";

export const DefaultCalendarHeader: FC<CalendarHeaderProps> = ({
  currentDate,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <>
      <View className="flex-row items-center justify-between p-5">
        <Text variant='large'>
          {dayjs(currentDate).format('MMMM YYYY')}
        </Text>
        <EventCalendarViewToggle value={viewMode} onChange={onViewModeChange} />
      </View>
    </>
  );
};