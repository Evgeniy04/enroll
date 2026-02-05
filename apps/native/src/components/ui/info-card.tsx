import { Card, CardContent } from "@/components/ui/card";
import { getGradientColors, GradientIcon } from "@/components/ui/gradient-icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { LinearGradientProps } from "expo-linear-gradient";
import { FC } from "react";
import { View } from "react-native";

interface InfoCardProps {
  icon: any;
  title?: string;
  description?: string;
  colors?: LinearGradientProps["colors"];
  className?: string;
}

export const InfoCard: FC<InfoCardProps> = ({
  icon,
  title,
  description,
  colors = getGradientColors("blue"),
  className,
}) => {
  return (
    <Card className={cn("w-full rounded-2xl border-info/50", className)}>
      <CardContent className="flex-row items-center gap-4">
        <GradientIcon icon={icon} colors={colors} />

        <View className="flex-1 gap-1">
          {title && <Text className="font-medium">{title}</Text>}
          {description && (
            <Text variant="muted" className="text-muted-foreground">
              {description}
            </Text>
          )}
        </View>
      </CardContent>
    </Card>
  );
};
