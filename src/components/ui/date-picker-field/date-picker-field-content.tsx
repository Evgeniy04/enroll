import { DatePicker } from '@/components/ui/date-picker';
import { DatePickerFieldContactProps } from '@/components/ui/date-picker-field/date-picker-field.types';
import { Text } from '@/components/ui/text';
import { useRootContext as useRootContextPopover } from '@rn-primitives/popover';
import { FC } from 'react';
import { View } from 'react-native';
import { DateData } from 'react-native-calendars';

const todayDate = new Date();

export const DatePickerContent: FC<DatePickerFieldContactProps> = ({
  helperText,
  currentDate,
  setCurrentDate,
  title,
  startYear = 1950,
  endYear = todayDate.getFullYear(),
  minDate = new Date(startYear, 0, 1).toDateString(),
  maxDate = todayDate.toDateString(),
  contentInsets,
}) => {
  const { onOpenChange} = useRootContextPopover();

  const handleDayPress = (day: DateData) => {
    const selectedDate = new Date(day.dateString);
    setCurrentDate(selectedDate);
    onOpenChange(false);
  };

  return (
    <View className="gap-4">
      <View className="gap-2">
        <Text className="font-medium leading-none">{title}</Text>
        {helperText && (
          <Text className="text-muted-foreground text-sm">
            {helperText}
          </Text>
        )}
      </View>

      <DatePicker
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        contentInsets={contentInsets}
        minDate={minDate}
        maxDate={maxDate}
        startYear={startYear}
        endYear={endYear}
        onDayPress={handleDayPress}
      />
    </View>
  );
}