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

export const EmptyState: FC<EmptyStateProps> = ({ icon: IconComponent, message, hint }) => (
  <Card className="border-dashed gap-2 p-4 items-center">
    {IconComponent && <Icon as={IconComponent} size={32} className="text-muted-foreground mb-2" />}
    <Text variant="muted" className="text-center text-muted-foreground">
      {message}
    </Text>
    {hint && (
      <View className="flex-row justify-center items-center mt-2 flex-wrap">
        {typeof hint === "string" ? (
          <Text variant="muted" className="text-muted-foreground text-center">{hint}</Text>
        ) : (
          hint
        )}
      </View>
    )}
  </Card>
);
