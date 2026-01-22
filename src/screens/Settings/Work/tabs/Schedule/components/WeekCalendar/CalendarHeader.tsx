import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import dayjs, { Dayjs } from 'dayjs';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react-native';
import React, { FC } from 'react';
import { View } from 'react-native';

interface CalendarHeaderProps {
  weekStart: Dayjs;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onGoToToday: () => void;
  className?: string;
}

export const CalendarHeader: FC<CalendarHeaderProps> = ({
  weekStart,
  onPrevWeek,
  onNextWeek,
  onGoToToday,
  className
}) => {
  const weekEnd = weekStart.add(6, 'day');

  const showGoToCurrentWeekButton = !dayjs().isBetween(
    weekStart,
    weekEnd,
    null,
    '[]'
  );

  const formatWeekRange = (start: Dayjs, end: Dayjs) => {
    const startStr = start.format('D MMM');
    const endStr = end.format('D MMM');
    return `${startStr} - ${endStr}`;
  };

  return (
    <CardContent className={cn("p-2 gap-2", className)}>
      <View className='flex-row justify-between items-center'>
        <Button size="icon" variant="outline" onPress={onPrevWeek}>
          <Icon as={ChevronLeft} />
        </Button>
        
        <View className='justify-center'>
          <Text variant='small' className='text-center text-muted-foreground'>
            {weekStart.year()}
          </Text>
          <Text variant='lead' className='text-primary'>{formatWeekRange(weekStart, weekEnd)}</Text>
        </View>
        
        <View className='flex-row'>
          {showGoToCurrentWeekButton && (
            <Button size="icon" variant="outline" className='border-r-0 rounded-r-none' onPress={onGoToToday}>
              <Icon as={RotateCcw} />
            </Button>
          )}
          <Button
            size="icon"
            variant="outline"
            className={cn(
              showGoToCurrentWeekButton
                ? 'border-l-0 rounded-l-none'
                : 'border-l border-l-border rounded-l-md'
            )}
            onPress={onNextWeek}
          >
            <Icon as={ChevronRight} />
          </Button>
        </View>
      </View>
    </CardContent>
  );
};
