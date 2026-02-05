import { KeyboardAvoidingScreen } from "@/components/layout/KeyboardAvoidingScreen";
import { Card } from "@/components/ui/card";
import { EventCalendar } from "@/components/ui/event-calendar";
import { InfoCard } from "@/screens/contacts/ContactDetails/components/InfoCard";
import { ProfileCard } from "@/screens/contacts/ContactDetails/components/ProfileCard";
import { EVENTS } from "@/screens/test-store";
import { Stack, useLocalSearchParams } from "expo-router";
import { BriefcaseBusiness, CarIcon, MapPin } from "lucide-react-native";
import { useState } from "react";

type ContactDetailsParams = {
  id: string;
};

export const ContactDetails = () => {
  const { id } = useLocalSearchParams<ContactDetailsParams>();
  const [date, setDate] = useState<Date>(new Date());

  return (
    <>
      <Stack.Screen options={{ title: "Запись" }} />
      <KeyboardAvoidingScreen>
        <ProfileCard id={id} />
        <Card className="m-5 overflow-hidden p-0">
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
        </Card>
        <InfoCard
          title="Профессиональная информация"
          icon={BriefcaseBusiness}
          items={[
            {
              label: "Вид деятельности",
              value: "Мастер производственного обучения",
            },
            { label: "Категория водительских прав", value: "A, B, C" },
            { label: "Водительский стаж", value: "15 лет" },
          ]}
        />
        <InfoCard
          title="Автомобиль"
          icon={CarIcon}
          items={[
            { label: "Марка и модель", value: "Toyota Corolla" },
            { label: "Тип трансмиссии", value: "Автоматическая" },
            { label: "Год выпуска", value: "2020" },
            { label: "Регистрационный номер", value: "О900ОО 70" },
            {
              label: "Дополнительно",
              value: "Дублирующие педали, кондиционер, камера заднего вида",
            },
          ]}
          photoUri="https://hips.hearstapps.com/hmg-prod/images/2023-range-rover-se-p400-lwb-105-1650304551.jpg?crop=0.960xw:0.810xh;0,0.115xh&resize=2048:*"
        />
        <InfoCard
          title="Место"
          icon={MapPin}
          items={[
            { label: "Адрес", value: "г. Томск, пр. Мира, 118 б" },
            {
              label: "Дополнительно",
              value: "Автошкола и прилегающие районы, экзаменационные маршруты",
            },
          ]}
        />
      </KeyboardAvoidingScreen>
    </>
  );
};
