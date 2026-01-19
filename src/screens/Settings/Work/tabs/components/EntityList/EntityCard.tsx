import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Pencil, Trash } from 'lucide-react-native';
import { FC, useCallback } from 'react';
import { View } from 'react-native';

export interface EntityCardProps {
  entityId: string;
  title: string;
  descriptionItems?: { label: string; value: string }[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EntityCard: FC<EntityCardProps> = ({
  entityId,
  title,
  descriptionItems = [],
  onEdit,
  onDelete,
}) => {
  const handleEdit = useCallback(() => onEdit(entityId), [onEdit, entityId]);
  const handleDelete = useCallback(() => onDelete(entityId), [onDelete, entityId]);

  return (
    <Card className="p-5 gap-0">
      <View className="flex-row justify-between items-center mb-5">
        <Text
          variant="h4"
          className="flex-1 mr-2"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
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

      {descriptionItems.length > 0 && (
        descriptionItems.map((item) => (
          <View key={item.label} className="flex-row justify-between items-center">
            <Text variant="muted" className="text-muted-foreground">{item.label}</Text>
            <Text variant="muted" className="text-muted-foreground">{item.value}</Text>
          </View>
        ))
      )}
    </Card>
  );
};
