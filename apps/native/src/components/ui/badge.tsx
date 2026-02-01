import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { LucideIcon } from "lucide-react-native";
import { View, ViewProps } from "react-native";
import { FC } from "react";

interface BadgeProps extends ViewProps {
  icon?: LucideIcon;
  text: string;
  variant?:
    | "default"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "destructive"
    | "outline";
  iconSize?: number;
  className?: string;
}

const variantStyles = {
  default: {
    container: "bg-primary",
    content: "text-primary-foreground",
  },
  secondary: {
    container: "bg-secondary",
    content: "text-secondary-foreground",
  },
  info: {
    container: "bg-info",
    content: "text-info-foreground",
  },
  success: {
    container: "bg-success",
    content: "text-success-foreground",
  },
  warning: {
    container: "bg-warning",
    content: "text-warning-foreground",
  },
  destructive: {
    container: "bg-destructive",
    content: "text-primary-foreground",
  },
  outline: {
    container: "border border-input bg-transparent",
    content: "text-foreground",
  },
};

export const Badge: FC<BadgeProps> = ({
  icon,
  text,
  variant = "default",
  iconSize = 14,
  className,
  ...props
}) => {
  const styles = variantStyles[variant];

  return (
    <View
      className={cn(
        "flex-row items-center gap-1.5 rounded px-[0.3rem] py-[0.2rem]",
        styles.container,
        className,
      )}
      {...props}
    >
      {icon && <Icon as={icon} size={iconSize} className={styles.content} />}
      <Text className={cn("text-xs", styles.content)}>{text}</Text>
    </View>
  );
};
