import { Card } from "@/components/ui/card";
import { EventCalendar } from "@/components/ui/event-calendar";
import { Loading } from "@/components/ui/loading";
import { HeaderCard } from "@/screens/(contacts,settings)/ProfileDetails/components/HeaderCard";
import { SectionCard } from "@/screens/(contacts,settings)/ProfileDetails/components/SectionCard";
import { EVENTS } from "@/screens/test-store";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { MOCK_SECTIONS } from "./mockData";

type ProfileDetailsParams = {
  id: string;
};

export const ProfileDetails = () => {
  const { id } = useLocalSearchParams<ProfileDetailsParams>();
  const [date, setDate] = useState<Date>(new Date());
  const [shouldRenderCalendar, setShouldRenderCalendar] = useState(false);

  useEffect(() => {
    const handle = window.requestIdleCallback(
      () => {
        setShouldRenderCalendar(true);
      },
      { timeout: 500 },
    );

    return () => window.cancelIdleCallback(handle);
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: "Запись" }} />

      <FlatList
        data={MOCK_SECTIONS}
        renderItem={({ item }) => <SectionCard {...item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <HeaderCard id={id} />
            <Card className="m-5 overflow-hidden p-0">
              {shouldRenderCalendar ? (
                <EventCalendar
                  date={date}
                  onDateChange={setDate}
                  height={500}
                  events={EVENTS}
                  onPressEvent={(e) => {
                    console.log("Нажали на событие:", e);
                  }}
                  showVerticalScrollIndicator
                />
              ) : (
                <Loading className="h-[500]" />
              )}
            </Card>
          </>
        }
      />
    </>
  );
};
