import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getGradientColors, GradientIcon } from "@/components/ui/gradient-icon";
import { Icon } from "@/components/ui/icon";
import { InfoCard } from "@/components/ui/info-card";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { CalendarCheck, Clock, PhoneOff, Play } from "lucide-react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Welcome = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const onPressContinue = () =>
    router.push({
      pathname: "/Otp",
    });

  return (
    <>
      <ScrollView
        contentContainerClassName="grow"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="mx-5 flex-1 justify-center gap-10"
          style={{
            marginTop: insets.top + 20,
            marginBottom: insets.bottom + 200,
          }}
        >
          <View>
            <Text variant="h1" className="text-center">
              Запишитесь сейчас.
            </Text>

            <Text variant="h1" className="text-center text-cyan-500">
              Успейте вовремя.
            </Text>

            <Text className="mt-5 text-center text-muted-foreground">
              Выберите специалиста и удобное время — остальное мы берём на себя.
            </Text>
          </View>

          <View className="w-full gap-4">
            <InfoCard
              icon={Clock}
              title="Быстро и спокойно"
              description="Вся запись занимает меньше минуты"
              className="shadow-md"
            />

            <InfoCard
              icon={PhoneOff}
              title="Без звонков"
              description="Никаких ожиданий и неловких разговоров"
              colors={getGradientColors("purple")}
              className="shadow-md"
            />

            <InfoCard
              icon={CalendarCheck}
              title="В удобное время"
              description="Только актуальные и свободные окна"
              colors={getGradientColors("emerald")}
              className="shadow-md"
            />
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute left-5 right-5 gap-5"
        style={{
          bottom: insets.bottom + 20,
        }}
      >
        <Card className="rounded-2xl border-info/50 py-2">
          <CardContent className="flex-row items-center gap-4">
            <View className="flex-row items-center">
              <GradientIcon
                icon={Clock}
                colors={getGradientColors("blue")}
                size={24}
                sizeIcon={16}
                style={{ borderRadius: 12 }}
              />
              <GradientIcon
                icon={PhoneOff}
                colors={getGradientColors("purple")}
                size={24}
                sizeIcon={16}
                style={{ marginLeft: -8, borderRadius: 12 }}
              />
              <GradientIcon
                icon={CalendarCheck}
                colors={getGradientColors("emerald")}
                size={24}
                sizeIcon={16}
                style={{ marginLeft: -8, borderRadius: 12 }}
              />
            </View>

            <Text variant="muted" className="flex-1 text-muted-foreground">
              Присоединяйтесь к тем, кто уже оценил удобство
            </Text>
          </CardContent>
        </Card>
        <Button size="lg" onPress={onPressContinue}>
          <Icon as={Play} className="text-primary-foreground" />
          <Text>Начать</Text>
        </Button>
      </View>
    </>
  );
};
