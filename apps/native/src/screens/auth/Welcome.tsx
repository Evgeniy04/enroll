import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  CalendarCheck,
  Clock,
  Phone,
  PhoneOff,
  Play,
} from "lucide-react-native";
import { FC } from "react";
import { ColorValue, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AdvantageCardProps {
  icon: any;
  title: string;
  description: string;
  variant?: "blue" | "purple" | "emerald";
}

const GRADIENT_COLORS: Record<
  "blue" | "purple" | "emerald",
  [ColorValue, ColorValue, ...ColorValue[]]
> = {
  blue: ["#3b82f6", "#06b6d4"],
  purple: ["#8b5cf6", "#ec4899"],
  emerald: ["#10b981", "#14b8a6"],
};

interface GradientIconProps {
  icon: any;
  variant: "blue" | "purple" | "emerald";
  size?: number;
  sizeIcon?: number;
  style?: object;
}

const GradientIcon: FC<GradientIconProps> = ({
  icon,
  variant,
  size = 36,
  sizeIcon = size * 0.75,
  style,
}) => (
  <LinearGradient
    colors={GRADIENT_COLORS[variant]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{
      width: size,
      height: size,
      borderRadius: size / 4,
      justifyContent: "center",
      alignItems: "center",
      ...style,
    }}
  >
    <Icon as={icon} size={sizeIcon} className="text-primary-foreground" />
  </LinearGradient>
);

const AdvantageCard: FC<AdvantageCardProps> = ({
  icon,
  title,
  description,
  variant = "blue",
}) => (
  <Card className="rounded-2xl border border-info/50 bg-background shadow-sm">
    <CardContent className="flex-row items-center gap-4">
      <GradientIcon icon={icon} variant={variant} />

      <View className="flex-1 gap-1">
        <Text className="font-medium">{title}</Text>
        <Text variant="muted" className="text-muted-foreground">
          {description}
        </Text>
      </View>
    </CardContent>
  </Card>
);

export const Welcome = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const onPressContinue = () =>
    router.push({
      pathname: "/SignIn",
    });

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
        }}
      >
        <View
          className="flex-1 justify-center gap-10"
          style={{ marginTop: insets.top, marginBottom: insets.bottom + 104 }}
        >
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
              variant="blue"
            />

            <AdvantageCard
              icon={PhoneOff}
              title="Без звонков"
              description="Никаких ожиданий и неловких разговоров"
              variant="purple"
            />

            <AdvantageCard
              icon={CalendarCheck}
              title="В удобное время"
              description="Только актуальные и свободные окна"
              variant="emerald"
            />

            <Card className="mt-5 rounded-2xl border border-info/50 bg-background py-2 shadow-sm">
              <CardContent className="flex-row items-center gap-4">
                <View className="flex-row items-center">
                  <GradientIcon
                    icon={Clock}
                    variant="blue"
                    size={24}
                    sizeIcon={16}
                    style={{ borderRadius: 12 }}
                  />
                  <GradientIcon
                    icon={Phone}
                    variant="purple"
                    size={24}
                    sizeIcon={16}
                    style={{ marginLeft: -8, borderRadius: 12 }}
                  />
                  <GradientIcon
                    icon={CalendarCheck}
                    variant="emerald"
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
          </View>
        </View>
      </ScrollView>

      <Button
        size="lg"
        onPress={onPressContinue}
        className="absolute left-5 right-5"
        style={{
          bottom: insets.bottom + 20,
        }}
      >
        <Icon as={Play} className="text-primary-foreground" />
        <Text>Начать</Text>
      </Button>
    </>
  );
};
