import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { LucideIcon } from "lucide-react-native";
import { FC, ReactNode } from "react";
import { View } from "react-native";

interface EmptyStateProps {
  icon?: LucideIcon;
  message: string | ReactNode;
  hint?: string | ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon: IconComponent,
  message,
  hint,
}) => (
  <Card className="items-center gap-2 border-dashed p-4">
    {IconComponent && (
      <Icon
        as={IconComponent}
        size={32}
        className="mb-2 text-muted-foreground"
      />
    )}
    <Text variant="muted" className="text-center text-muted-foreground">
      {message}
    </Text>
    {hint && (
      <View className="mt-2 flex-row flex-wrap items-center justify-center">
        {typeof hint === "string" ? (
          <Text variant="muted" className="text-center text-muted-foreground">
            {hint}
          </Text>
        ) : (
          hint
        )}
      </View>
    )}
  </Card>
);
