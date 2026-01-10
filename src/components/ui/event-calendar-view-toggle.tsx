import { AlertProps } from '@/components/ui/base-toast';
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Calendar, CalendarDays, CalendarRange } from 'lucide-react-native';
import { FC } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export type CalendarViewMode = 'day' | '3days' | 'week';

const CALENDAR_VIEW_TOAST_CONFIG: Record<CalendarViewMode, AlertProps> = {
  day: {
    title: 'Дневной график 🗓️',
    description: 'Актуальные записи на сегодня',
  },
  '3days': {
    title: 'Краткосрочный план 📆',
    description: 'График работы на ближайшие дни',
  },
  week: {
    title: 'Недельный график 📅',
    description: 'Полный список записей на неделю',
  },

};

interface EventCalendarViewToggleProps {
  value: CalendarViewMode;
  onChange: (mode: CalendarViewMode) => void;
  className?: string;
}

export const EventCalendarViewToggle: FC<EventCalendarViewToggleProps> = ({
  value,
  onChange,
  className,
}) => {
  const bottomTabBarHeight = useBottomTabBarHeight();

  const handleChange = (nextMode?: string) => {
    if (
      nextMode !== 'day' &&
      nextMode !== '3days' &&
      nextMode !== 'week'
    ) {
      return;
    }

    onChange(nextMode);

    Toast.show({
      type: 'success',
      props: CALENDAR_VIEW_TOAST_CONFIG[nextMode],
      bottomOffset: bottomTabBarHeight,
    });
  };

  return (
    <ToggleGroup
      type='single'
      size='default'
      value={value}
      onValueChange={handleChange}
      variant={Platform.OS === 'ios' ? 'default' : 'outline'}
      className={className}
    >
      <ToggleGroupItem
        isFirst
        value='day'
        aria-label='1 день'
        className={Platform.OS === 'ios' ? 'rounded-l-full' : 'rounded-l-md'}
      >
        <ToggleGroupIcon as={CalendarDays} />
      </ToggleGroupItem>

      <ToggleGroupItem
        value='3days'
        aria-label='3 дня'
      >
        <ToggleGroupIcon as={CalendarRange} />
      </ToggleGroupItem>

      <ToggleGroupItem
        isLast
        value='week'
        aria-label='7 дней'
        className={Platform.OS === 'ios' ? 'rounded-r-full' : 'rounded-r-md'}
      >
        <ToggleGroupIcon as={Calendar} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}