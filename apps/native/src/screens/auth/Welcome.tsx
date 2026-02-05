import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { CalendarCheck, Clock, PhoneOff, Play } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

interface AdvantageCardProps {
  icon: any;
  title: string;
  description: string;
}

const AdvantageCard: FC<AdvantageCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className="rounded-2xl border border-info/50 bg-background shadow-sm">
      <CardContent className="flex-row items-center gap-4 py-3">
        <Icon as={icon} size={24} className="text-info-foreground" />

        <View className="flex-1 gap-1">
          <Text className="font-medium">{title}</Text>
          <Text variant="muted" className="text-muted-foreground">
            {description}
          </Text>
        </View>
      </CardContent>
    </Card>
  );
};

export const Welcome = () => {
  const router = useRouter();

  const onPressContinue = () =>
    router.push({
      pathname: "/SignIn",
    });

  return (
    <View className="flex-1 justify-between p-5">
      <View className="flex-1 justify-center gap-10">
        <View>
          <Text variant="h1" className="text-center">
            Запишитесь сейчас.
          </Text>

          <Text variant="h1" className="text-center text-info-foreground">
            Успейте вовремя.
          </Text>

          <Text className="mt-5 text-center text-muted-foreground">
            Выберите специалиста и удобное время — остальное мы берём на себя.
          </Text>
        </View>

        <View className="w-full gap-4">
          <AdvantageCard
            icon={Clock}
            title="Быстро и спокойно"
            description="Вся запись занимает меньше минуты"
          />

          <AdvantageCard
            icon={PhoneOff}
            title="Без звонков"
            description="Никаких ожиданий и неловких разговоров"
          />

          <AdvantageCard
            icon={CalendarCheck}
            title="В удобное время"
            description="Только актуальные и свободные окна"
          />
        </View>
      </View>
      <Button size="lg" onPress={onPressContinue}>
        <Icon as={Play} className="text-primary-foreground" />
        <Text>Продолжить</Text>
      </Button>
    </View>
  );
};
