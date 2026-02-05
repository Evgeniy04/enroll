import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { Bell, RotateCcw } from "lucide-react-native";
import { FC } from "react";
import { Platform, View } from "react-native";

interface HomeHeaderActionProps {
  onGoToToday?: () => void;
  onPressOpenNotification?: () => void;
}

export const HomeHeaderAction: FC<HomeHeaderActionProps> = ({
  onGoToToday,
  onPressOpenNotification,
}) => {
  return (
    <View className="gap flex-row">
      {onGoToToday && (
        <Button
          onPress={onGoToToday}
          variant={Platform.OS === "ios" ? "ghost" : "outline"}
          size="sm"
          className="rounded-full rounded-r-none border-r-0"
        >
          <Icon as={RotateCcw} className="size-4" />
        </Button>
      )}
      <Button
        onPress={onPressOpenNotification}
        variant={Platform.OS === "ios" ? "ghost" : "outline"}
        size="sm"
        className={cn(
          "rounded-full",
          onGoToToday ? "rounded-l-none" : "rounded-l-full",
          Platform.OS === "ios" || "border-l",
        )}
      >
        <Icon as={Bell} className="size-4" />
      </Button>
    </View>
  );
};
