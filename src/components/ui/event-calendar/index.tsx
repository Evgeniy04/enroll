import { DefaultCalendarHeader } from '@/components/ui/event-calendar/calendar-header';
import {
  CalendarEvent,
  CalendarViewMode,
  EventCalendarProps
} from '@/components/ui/event-calendar/event-calendar.types';
import { CALENDAR_CONSTANTS, getBigCalendarTheme } from '@/config';
import dayjs from 'dayjs';
import { useColorScheme } from 'nativewind';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Calendar, EventRenderer } from 'react-native-big-calendar';

export const EventCalendar: FC<EventCalendarProps> = ({
  sceneHeight,
  events,
  initialDate = new Date(),
  initialViewMode = '3days',
  onPressEvent,
  renderEvent,
  eventCellStyle,
  HeaderComponent,
  onDateChange,
  onViewModeChange,
  viewMode: externalViewMode,
  currentDate: externalCurrentDate,
}) => {
  const { colorScheme } = useColorScheme();

  const [internalViewMode, setInternalViewMode] =
    useState<CalendarViewMode>(initialViewMode);

  const [internalCurrentDate, setInternalCurrentDate] =
    useState<Date>(initialDate);

  const theme = useMemo(
    () => getBigCalendarTheme(colorScheme ?? 'light'),
    [colorScheme]
  );

  const viewMode = externalViewMode
    ? externalViewMode
    : internalViewMode;

  const currentDate = externalCurrentDate
    ? externalCurrentDate
    : internalCurrentDate;

  const setCurrentDate = onDateChange
    ? onDateChange
    : setInternalCurrentDate;

  const setViewMode = onViewModeChange
    ? onViewModeChange
    : setInternalViewMode;

  const calendarDate = useMemo(
    () => {
      if (viewMode === 'week') {
        return dayjs(currentDate).weekday(0).toDate();
      }

      return currentDate;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [viewMode]
  );

  useEffect(
    () => {
      if (!dayjs(currentDate).isSame(calendarDate, 'day')) {
        setCurrentDate(calendarDate);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [calendarDate, setCurrentDate]
  );

  const handleSwipeEnd = useCallback(
    (date: Date) => {
      setCurrentDate(date);
    },
    [setCurrentDate]
  );

  const handleViewModeChange = useCallback(
    (mode: CalendarViewMode) => {
      setViewMode(mode);
    },
    [setViewMode]
  );

  const defaultRenderEvent: EventRenderer = useCallback(
    (event, touchableOpacityProps) => (
      <TouchableOpacity {...touchableOpacityProps} key={touchableOpacityProps.key}>
        <View className="flex-1 justify-center">
          <Text className="text-xs color-white" numberOfLines={1}>
            {event.title}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  const defaultEventCellStyle = useCallback((event: CalendarEvent) => {
    const now = new Date();
    const isCurrent = event.start <= now && event.end >= now;

    return {
      backgroundColor: isCurrent ? '#06cdecff' : event.color || '#3b82f6',
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      borderTopWidth: 1,
      borderColor: '#000',
    };
  }, []);

  const HeaderToRender =
    HeaderComponent === undefined
      ? DefaultCalendarHeader
      : HeaderComponent;

  /**
   * Ключ для перерисовки календаря при смене режима просмотра или даты инициализации
   */
  const calendarKey = useMemo(
    () => `${viewMode}-${dayjs(calendarDate).format('YYYY-MM-DD')}`,
    [viewMode, calendarDate]
  );

  return (
    <View className="flex-1">
      {HeaderToRender && (
        <HeaderToRender
          currentDate={currentDate}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />
      )}

      <Calendar
        key={calendarKey}
        locale="ru"
        date={calendarDate}
        weekStartsOn={CALENDAR_CONSTANTS.FIRST_DAY}
        theme={theme}
        mode={viewMode}
        events={events}
        height={sceneHeight}
        eventCellStyle={eventCellStyle ?? defaultEventCellStyle}
        renderEvent={renderEvent ?? defaultRenderEvent}
        onPressEvent={onPressEvent}
        onSwipeEnd={handleSwipeEnd}
      />
    </View>
  );
};
