import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Pencil, Trash } from 'lucide-react-native';
import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { Service } from '../Services.types';

interface ServiceCardProps {
  service: Service;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ServiceCard: FC<ServiceCardProps> = ({
  service,
  onEdit,
  onDelete,
}) => {
  const handleEdit = useCallback(() => onEdit(service.id), [onEdit, service]);
  const handleDelete = useCallback(() => onDelete(service.id), [onDelete, service]);

  return (
    <Card className="p-5 gap-0">
      <View className="flex-row justify-between items-center mb-5">
        <Text
          variant="h4"
          className="flex-1 mr-2"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {service.name}
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

      <View className="flex-row justify-between items-center">
        <Text variant="muted" className='text-muted-foreground'>Длительность</Text>
        <Text variant="muted" className='text-muted-foreground'>{service.duration} мин</Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text variant="muted" className='text-muted-foreground'>Перерыв после</Text>
        <Text variant="muted" className='text-muted-foreground'>
          {service.breakAfter ? `${service.breakAfter} мин` : 'отсутствует'}
        </Text>
      </View>
    </Card>
  );
};
