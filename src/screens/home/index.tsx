import { EventCalendar } from '@/components/ui/event-calendar';
import { EventCalendarViewToggle } from '@/components/ui/event-calendar-view-toggle';
import { CalendarViewMode } from '@/components/ui/event-calendar/event-calendar.types';
import { useContentInsets } from '@/hooks/useContentInsets';
import useScreenHeight from '@/hooks/useScreenHeight';
import dayjs from 'dayjs';
import { Stack } from 'expo-router';
import React, { useMemo, useState } from "react";
import { Event, EVENTS } from '../test-store';

export const Home = () => {
  const { top: topHeaderHeight, bottom: bottomTabBarHeight } = useContentInsets();
  const screenHeight = useScreenHeight();
  const [ viewMode, setViewMode ] = useState<CalendarViewMode>('3days');
  const [ currentDate, setCurrentDate ] = useState<Date>(new Date());
  const [ events ] = useState<Event[]>(EVENTS);

  const sceneHeight = useMemo(
    () => screenHeight - topHeaderHeight - bottomTabBarHeight + 46, 
    [screenHeight, topHeaderHeight, bottomTabBarHeight]
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: dayjs(currentDate).format('MMMM YYYY'),
          headerTitleAlign: "center",
          headerLeft: () => <EventCalendarViewToggle value={viewMode} onChange={setViewMode} enableIosSpecials />,
        }}
      />
      <EventCalendar
        sceneHeight={sceneHeight}
        events={events}
        HeaderComponent={null}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        onPressEvent={(e) => {
          console.log("Нажали на событие:", e);
        }}
      />
    </>
  );
};