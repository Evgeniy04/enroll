import { DatePickerValue } from '@/components/ui/date-picker';
import { ToggleGroupField } from '@/components/ui/toggle-group-field';
import { Calendar, Clock, Infinity as InfinityIcon } from 'lucide-react-native';
import { FC } from 'react';

interface BookingLimitModeSelectorProps {
  value: string;
  daysAhead: number;
  endDate?: DatePickerValue;
  onChange: (value: string | undefined) => void;
}

export const BookingLimitModeSelector: FC<BookingLimitModeSelectorProps> = ({
  value,
  daysAhead,
  endDate,
  onChange,
}) => {
  const options = [
    {
      value: 'days-ahead',
      icon: Clock,
      showText: true,
      label: `На ${daysAhead} дней вперёд`,
    },
    {
      value: 'specific-date',
      icon: Calendar,
      showText: true,
      label: `До ${
        endDate ? endDate.start.format('DD.MM.YYYY') : 'конкретной даты'
      }`,
    },
    {
      value: 'unlimited',
      icon: InfinityIcon,
      showText: true,
      label: 'Без ограничения',
    },
  ]

  return (
    <ToggleGroupField
      nativeID="mode-selector"
      label="Тип ограничения"
      type="single"
      variant="outline"
      orientation="vertical"
      value={value}
      onValueChange={onChange}
      options={options}
    />
  );
};
