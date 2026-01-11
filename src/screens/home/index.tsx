import { CalendarViewMode, EventCalendarViewToggle } from '@/components/ui/event-calendar-view-toggle';
import { CALENDAR_CONSTANTS } from '@/config';
import { useContentInsets } from '@/hooks/useContentInsets';
import useScreenHeight from '@/hooks/useScreenHeight';
import dayjs from 'dayjs';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar as EventCalendar, EventRenderer, PartialTheme } from "react-native-big-calendar";
import { Event, EVENTS } from '../test-store';

const CALENDAR_THEMES: Record<string, PartialTheme> = {
  default: {},
  dark: {
    palette: {
      primary: { main: '#6185d0', contrastText: '#000' },
      gray: {
        '100': '#333', '200': '#666', '300': '#888', '500': '#aaa', '800': '#ccc',
      },
    },
  },
};

export const Home = () => {
  const { colorScheme } = useColorScheme();
  const { top: topHeaderHeight, bottom: bottomTabBarHeight } = useContentInsets();
  const screenHeight = useScreenHeight();
  const [ viewMode, setViewMode ] = useState<CalendarViewMode>('3days');
  const [ currentDate, setCurrentDate ] = useState<Date>(new Date());
  const [ events ] = useState<Event[]>(EVENTS);
  
  const initialDate = useMemo(
    () => {
      switch (viewMode) {
        case 'week':
          const startDateRange = dayjs(currentDate).weekday(0).toDate();
          setCurrentDate(startDateRange);
          return startDateRange;
        default:
          return currentDate;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [viewMode]
  );

  const sceneHeight = useMemo(
    () => screenHeight - topHeaderHeight - bottomTabBarHeight + 46, 
    [screenHeight, topHeaderHeight, bottomTabBarHeight]
  );

  const renderEvent: EventRenderer = useCallback((event, touchableOpacityProps) => (
    <TouchableOpacity {...touchableOpacityProps} key={touchableOpacityProps.key}>
      <View className='flex-1 justify-center'>
        <Text className='text-xs color-white' numberOfLines={1}>
          {event.title}
        </Text>
      </View>
    </TouchableOpacity>
  ), []);

  const eventCellStyle = useCallback((event: Event) => {
    const now = new Date();
    const isCurrent = event.start <= now && event.end >= now;
    
    return {
      backgroundColor: isCurrent ? '#06cdecff' : event.color,
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      borderTopWidth: 1,
      borderColor: "#000",
    };
  }, []);

  const currentTheme = CALENDAR_THEMES[colorScheme ?? 'light'];

  const handleSwipeEnd = useCallback(
    (date: Date) => setCurrentDate(date),
    []
  );

  /**
   * Ключ для перерисовки календаря при смене режима просмотра или даты инициализации
   */
  const calendarKey = useMemo(
    () => `${viewMode}-${dayjs(initialDate).format('YYYY-MM-DD')}`,
    [viewMode, initialDate]
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: dayjs(currentDate).format('MMMM YYYY'),
          headerTitleAlign: "center",
          headerLeft: () => <EventCalendarViewToggle value={viewMode} onChange={setViewMode} />,
        }}
      />
      <EventCalendar
        key={calendarKey}
        locale="ru"
        date={initialDate}
        weekStartsOn={CALENDAR_CONSTANTS.FIRST_DAY}
        theme={currentTheme}
        mode={viewMode}
        events={events}
        height={sceneHeight}
        eventCellStyle={eventCellStyle}
        renderEvent={renderEvent}
        onPressEvent={(e) => {
          console.log("Нажали на событие:", e);
        }}
        onSwipeEnd={handleSwipeEnd}
      />
    </>
  );
};