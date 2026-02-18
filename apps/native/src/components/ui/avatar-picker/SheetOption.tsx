import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react-native";
import { FC } from "react";
import { Platform } from "react-native";

interface SheetOptionProps {
  label: string;
  icon?: LucideIcon;
  isDestructive?: boolean;
  onPress: () => void;
}

export const SheetOption: FC<SheetOptionProps> = ({
  label,
  icon,
  isDestructive = false,
  onPress,
}) => (
  <Button
    onPress={onPress}
    className={Platform.select({ ios: "rounded-full" })}
  >
    {icon && (
      <Icon
        as={icon}
        size={20}
        className={cn(
          "text-primary-foreground",
          isDestructive && "text-destructive",
        )}
      />
    )}
    <Text className={cn(isDestructive && "text-destructive")}>{label}</Text>
  </Button>
);
