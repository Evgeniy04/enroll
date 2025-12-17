import { NativeSelectScrollView, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { CALENDAR_CONSTANTS, getCalendarTheme } from '@/config';
import { useRootContext as useRootContextPopover } from '@rn-primitives/popover';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface CustomCalendarHeaderProps {
  date: Date;
  onPressYear?: (year: number) => void;
  locale?: string;
  monthFormat?: string;
}

export function CustomCalendarHeaderTitle({date}: CustomCalendarHeaderProps) {
  const currentYear = date.getFullYear();
  const currentMonth = date.toLocaleDateString('ru-RU', { month: 'long' });
  
  // Генерируем список лет (например, от текущего года - 10 до текущего года + 10)
  const startYear = 1950;
  const endYear = new Date().getFullYear();
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return (
    <View className="flex-row items-center justify-center gap-2">
      <Text className="text-lg font-semibold capitalize">
        {currentMonth}
      </Text>
      

      <Select>
        <SelectTrigger>
          <Text className="text-lg font-semibold">{currentYear}</Text>
        </SelectTrigger>
        <SelectContent>
          <NativeSelectScrollView>
            <SelectGroup>
              <SelectLabel>Год</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} label={year.toString()} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </NativeSelectScrollView>
        </SelectContent>
      </Select>
    </View>
  );
}

type Props = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
};

export function DatePicker({
  currentDate,
  setCurrentDate,
}: Props) {
  const { colorScheme } = useColorScheme();
  const { onOpenChange } = useRootContextPopover();
  const calendarTheme = getCalendarTheme(colorScheme ?? 'light');

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
  };

  return (
        <Calendar
          current={currentDate.toISOString().split('T')[0]}
          firstDay={CALENDAR_CONSTANTS.FIRST_DAY}
          enableSwipeMonths // включить переключение месяцев свайпом
          onDayPress={(day) => {
            setCurrentDate(new Date(day.dateString));
            onOpenChange(false);
          }}
          customHeaderTitle={
            <CustomCalendarHeaderTitle
              date={currentDate} 
              onPressYear={handleYearChange} 
            />
          }
          theme={calendarTheme}
        />
  );
}