import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { LogOut, Settings2 } from "lucide-react-native";
import { FC } from "react";
import { Platform, View } from "react-native";

interface SettingsHeaderActionProps {
  onPressOpenWorkSettings?: () => void;
  onPressLogout?: () => void;
}

export const SettingsHeaderAction: FC<SettingsHeaderActionProps> = ({
  onPressOpenWorkSettings,
  onPressLogout,
}) => {
  return (
    <View className="gap flex-row">
      <Button
        onPress={onPressLogout}
        variant={Platform.OS === "ios" ? "ghost" : "outline"}
        size="sm"
        className="rounded-full rounded-r-none border-r-0"
      >
        <Icon as={LogOut} className="size-4" />
      </Button>
      <Button
        onPress={onPressOpenWorkSettings}
        variant={Platform.OS === "ios" ? "ghost" : "outline"}
        size="sm"
        className={cn(
          "rounded-full rounded-l-none",
          Platform.OS === "ios" || "border-l",
        )}
      >
        <Icon as={Settings2} className="size-4" />
      </Button>
    </View>
  );
};
