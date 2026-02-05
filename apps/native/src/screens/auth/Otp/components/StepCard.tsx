import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GradientColor,
  GradientIcon,
  getGradientColors,
} from "@/components/ui/gradient-icon";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ChevronLeft, LucideIcon } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface StepCardProps {
  iconColor: GradientColor;
  icon: LucideIcon;
  accentIcon: LucideIcon;
  accentColor: GradientColor;
  title: string;
  subtitle: string;
  InfoCardsContent?: React.ReactNode;
  onBack: () => void;
  children: React.ReactNode;
}

export const StepCard: FC<StepCardProps> = ({
  iconColor,
  icon,
  accentIcon,
  accentColor,
  title,
  subtitle,
  InfoCardsContent,
  onBack,
  children,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="mx-5 flex-1 items-center justify-center gap-5"
      style={{
        marginTop: insets.top,
        marginBottom: insets.bottom,
      }}
    >
      <Card className="w-full rounded-2xl border-info/50">
        <CardContent className="items-center gap-6">
          <Button variant="secondary" onPress={onBack} className="self-start">
            <Icon as={ChevronLeft} />
            <Text>Назад</Text>
          </Button>
          <View className="rounded-full border border-primary/10 p-4">
            <View className="rounded-full border-2 border-primary/20 p-5">
              <View className="absolute right-0 animate-bounce">
                <GradientIcon
                  colors={getGradientColors(accentColor)}
                  icon={accentIcon}
                  size={32}
                  sizeIcon={16}
                  style={{ borderRadius: 16 }}
                />
              </View>
              <GradientIcon
                colors={getGradientColors(iconColor)}
                icon={icon}
                size={96}
                sizeIcon={48}
              />
            </View>
          </View>
          <View className="gap-2">
            <Text variant="h1" className="text-center">
              {title}
            </Text>
            <Text variant="h3" className="text-center text-cyan-500">
              {subtitle}
            </Text>
          </View>
          {children}
        </CardContent>
      </Card>
      {InfoCardsContent}
    </View>
  );
};
