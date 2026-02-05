import {
  BaseEventCalendar,
  CalendarViewMode,
} from "@/components/ui/base-event-calendar";
import {
  defaultEventCellStyle,
  defaultRenderEvent,
} from "@/components/ui/event-calendar";
import { EventCalendarViewToggle } from "@/components/ui/event-calendar-view-toggle";
import { HomeHeaderAction } from "@/components/ui/header/home-header-action";
import { useContentInsets } from "@/hooks/useContentInsets";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { Event, EVENTS } from "@/screens/test-store";
import dayjs, { Dayjs } from "dayjs";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

const getShowButtonGoToToday = (
  viewMode: CalendarViewMode,
  date: Date,
  now: Dayjs,
): boolean => {
  const target = dayjs(date);

  let start: Dayjs;
  let end: Dayjs;

  switch (viewMode) {
    case "day": {
      start = now.subtract(2, "day");
      end = now.add(1, "day");
      break;
    }
    case "3days": {
      start = now.subtract(3, "day");
      end = now.add(2, "day");
      break;
    }
    case "week": {
      start = now.weekday(-1);
      end = start.add(6, "day");
      break;
    }
  }
  return target.isBefore(start) || target.isAfter(end);
};

export const Home = () => {
  const { top: topHeaderHeight, bottom: bottomTabBarHeight } =
    useContentInsets();
  const { height: screenHeight } = useWindowDimensions();

  const [viewMode, setViewMode] = useState<CalendarViewMode>("day");
  const [date, setDate] = useState<Date>(new Date());
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [events] = useState<Event[]>(EVENTS);

  const sceneHeight = screenHeight - topHeaderHeight - bottomTabBarHeight + 46;
  const now = dayjs();

  const handleInitialDateChange = (
    mode: CalendarViewMode,
    currentDate: Date = date,
  ) => {
    const targetDate =
      mode === "week" ? dayjs(currentDate).weekday(0).toDate() : currentDate;
    setInitialDate(targetDate);
    setDate(targetDate);
    setViewMode(mode);
  };

  const onGoToToday = getShowButtonGoToToday(viewMode, date, now)
    ? () => handleInitialDateChange(viewMode, new Date())
    : undefined;

  const headerLeft = () => (
    <EventCalendarViewToggle
      value={viewMode}
      onChange={handleInitialDateChange}
      enableIosSpecials
    />
  );

  const headerRight = () => <HomeHeaderAction onGoToToday={onGoToToday} />;

  return (
    <>
      <Stack.Screen
        options={{
          title: dayjs(date).format("MMMM YYYY"),
          headerTitleAlign: "center",
          headerLeft,
          headerRight,
        }}
      />
      <View className="flex-1">
        <BaseEventCalendar
          height={sceneHeight}
          initialDate={initialDate}
          date={date}
          onDateChange={setDate}
          viewMode={viewMode}
          events={events}
          renderEvent={defaultRenderEvent}
          eventCellStyle={defaultEventCellStyle}
        />
      </View>
    </>
  );
};
