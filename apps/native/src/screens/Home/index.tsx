import {
  BaseEventCalendar,
  CalendarViewMode,
} from "@/components/ui/base-event-calendar";
import {
  defaultEventCellStyle,
  defaultRenderEvent,
} from "@/components/ui/event-calendar";
import { EventCalendarViewToggle } from "@/components/ui/event-calendar-view-toggle";
import { NotificationsHeaderAction } from "@/components/ui/header";
import { useContentInsets } from "@/hooks/useContentInsets";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { Event, EVENTS } from "@/screens/test-store";
import dayjs from "dayjs";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export const Home = () => {
  const { top: topHeaderHeight, bottom: bottomTabBarHeight } =
    useContentInsets();
  const { height: screenHeight } = useWindowDimensions();

  const [viewMode, setViewMode] = useState<CalendarViewMode>("day");
  const [date, setDate] = useState<Date>(new Date());
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [events] = useState<Event[]>(EVENTS);

  const sceneHeight = screenHeight - topHeaderHeight - bottomTabBarHeight + 46;

  const handleViewModeChange = (mode: CalendarViewMode) => {
    const targetDate = mode === "week" ? dayjs(date).weekday(0).toDate() : date;
    !dayjs(initialDate).isSame(targetDate, "day") && setInitialDate(targetDate);
    setViewMode(mode);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: dayjs(date).format("MMMM YYYY"),
          headerTitleAlign: "center",
          headerLeft: () => (
            <EventCalendarViewToggle
              value={viewMode}
              onChange={handleViewModeChange}
              enableIosSpecials
            />
          ),
          headerRight: () => <NotificationsHeaderAction />,
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
