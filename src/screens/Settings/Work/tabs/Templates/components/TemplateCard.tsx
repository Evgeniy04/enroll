import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Pencil, Trash } from "lucide-react-native";
import { FC, useCallback } from "react";
import { View } from "react-native";
import { Template } from "../Templates.types";

interface TemplateCardProps {
  template: Template,
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TemplateCard: FC<TemplateCardProps> = ({
  template,
  onEdit,
  onDelete,
}) => {
  const handleEdit = useCallback(() => onEdit('1'), [onEdit]);
  const handleDelete = useCallback(() => onDelete('1'), [onDelete]);
  
  return (
    <Card className="p-5 gap-0">
      <View className="flex-row justify-between items-center mb-5">
        <Text
          variant="h4"
          className="flex-1 mr-2"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {template.name}
        </Text>

        <View className="flex-row gap-1">
          <Button variant="outline" size="icon" onPress={handleEdit}>
            <Icon as={Pencil} />
          </Button>

          <Button variant="destructive" size="icon" onPress={handleDelete}>
            <Icon as={Trash} />
          </Button>
        </View>
      </View>
      <View className="flex-row items-center">
        <Text variant="muted" className="text-muted-foreground">{template.slots.length} слота</Text>
        <Text variant="muted" className="text-muted-foreground mx-2">•</Text>
        <Text variant="muted" className="text-muted-foreground">2 ч 40 мин</Text>
      </View>
    </Card>
  );
};