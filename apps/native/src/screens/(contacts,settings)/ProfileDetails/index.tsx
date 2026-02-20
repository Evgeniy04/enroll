import NotFoundScreen from "@/app/+not-found";
import { Card } from "@/components/ui/card";
import { EventCalendar } from "@/components/ui/event-calendar";
import { Loading } from "@/components/ui/loading";
import { authClient } from "@/lib/auth-client";
import { HeaderCard } from "@/screens/(contacts,settings)/ProfileDetails/components/HeaderCard";
import { EVENTS, User, USERS } from "@/screens/test-store";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

type ProfileDetailsParams = {
  id: string;
};

export const ProfileDetails = () => {
  const { id } = useLocalSearchParams<ProfileDetailsParams>();
  const { data } = authClient.useSession();
  const [date, setDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const handle = requestIdleCallback(() => setShowCalendar(true));

    return () => cancelIdleCallback(handle);
  }, []);

  const isOwnProfile = id === data?.user?.id;

  let user: User | undefined;

  if (isOwnProfile) {
    user = data?.user ?? USERS.find((u) => u.id === id);
  } else {
    user = USERS.find((u) => u.id === id);
  }

  if (!user) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <Stack.Screen
        options={{ title: isOwnProfile ? "Ваш профиль" : "Запись" }}
      />
      <ScrollView>
        <HeaderCard user={user} />
        <Card className="m-5 overflow-hidden p-0">
          {!showCalendar ? (
            <Loading className="h-[500]" />
          ) : (
            <EventCalendar
              date={date}
              onDateChange={setDate}
              height={500}
              events={EVENTS}
              onPressEvent={(e) => console.log("Нажали на событие:", e)}
              showVerticalScrollIndicator
            />
          )}
        </Card>
      </ScrollView>
    </>
  );
};
