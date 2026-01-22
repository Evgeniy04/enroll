import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Settings } from 'lucide-react-native';
import { FC } from 'react';
import { View } from 'react-native';

interface BookingLimitSettingsButtonProps {
  label?: string;
  value?: string;
  onPress?: () => void;
}

export const BookingLimitSettingsButton: FC<BookingLimitSettingsButtonProps> = ({
  label = 'Ограничение записи',
  value = 'отсутствуют',
  onPress,
}) => {
  return (
    <Button variant='default' className='justify-between' onPress={onPress}>
      <View className='flex-row items-center gap-1'>
        <Icon as={Settings} className='text-primary-foreground' />
        <Text>{label}</Text>
      </View>
      <Text variant='muted' className='text-muted-foreground'>—</Text>
      <Text variant='muted' className='text-muted-foreground'>{value}</Text>
    </Button>
  );
};