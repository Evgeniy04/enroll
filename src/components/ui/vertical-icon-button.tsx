import { Button, ButtonProps } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { LucideIcon } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

interface VerticalIconButtonProps extends ButtonProps {
  icon: LucideIcon;
  label: string;
  variant?: ButtonProps["variant"];
  disabled?: boolean;
}

export const VerticalIconButton: FC<VerticalIconButtonProps> = ({
  icon,
  label,
  variant = "default",
  disabled = false,
  className = "",
  ...buttonProps
}) => {
  const iconColorClassName = disabled
    ? "text-muted-foreground"
    : variant === "destructive"
      ? "text-white"
      : "text-primary-foreground";

  return (
    <Button
      className={`h-auto px-3 py-2 ${className}`}
      disabled={disabled}
      variant={variant}
      {...buttonProps}
    >
      <View className="items-center justify-center gap-1">
        <Icon as={icon} className={iconColorClassName} />
        <Text className="text-xs">{label}</Text>
      </View>
    </Button>
  );
};
