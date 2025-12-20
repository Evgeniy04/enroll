import { CalendarHeader } from '@/components/forms/date-picker/calendar-header';
import { CALENDAR_CONSTANTS, getCalendarTheme } from '@/config';
import { SelectContentInsets } from '@/hooks/useSelectContentInsets';
import { useRootContext as useRootContextPopover } from '@rn-primitives/popover';
import { useColorScheme } from 'nativewind';
import { Calendar, CalendarProps, DateData } from 'react-native-calendars';

type Props = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectContentInsets: SelectContentInsets;
  onClose?: () => void;
  minDate?: string;
  maxDate?: string;
  disabledDates?: string[];
  markedDates?: Record<string, any>;
  firstDay?: number;
  customTheme?: CalendarProps['theme'];
  locale?: string;
  startYear?: number;
  endYear?: number;
  monthLabel?: string;
  yearLabel?: string;
};

export function DatePicker({
  currentDate,
  setCurrentDate,
  selectContentInsets,
  onClose,
  minDate,
  maxDate,
  disabledDates,
  markedDates,
  firstDay = CALENDAR_CONSTANTS.FIRST_DAY,
  customTheme,
  locale = 'ru-RU',
  startYear = 1950,
  endYear = new Date().getFullYear(),
  monthLabel = 'Месяц',
  yearLabel = 'Год',
}: Props) {
  const { colorScheme } = useColorScheme();
  const { onOpenChange } = useRootContextPopover();
  const calendarTheme = customTheme ?? getCalendarTheme(colorScheme ?? 'light');

  const handleDayPress = (day: DateData) => {
    const selectedDate = new Date(day.dateString);
    setCurrentDate(selectedDate);
    
    if (onClose) {
      onClose();
    } else {
      onOpenChange(false);
    }
  };

  const mergedMarkedDates = {
    ...markedDates,
    ...(disabledDates?.reduce(
      (acc, date) => ({
        ...acc,
        [date]: { disabled: true, disableTouchEvent: true },
      }),
      {}
    ) ?? {}),
  };

  return (
    <Calendar
      current={currentDate.toISOString().split('T')[0]}
      minDate={minDate}
      maxDate={maxDate}
      markedDates={mergedMarkedDates}
      firstDay={firstDay}
      enableSwipeMonths
      onDayPress={handleDayPress}
      customHeader={(props: any) => (
        <CalendarHeader
          {...props}
          selectContentInsets={selectContentInsets}
          locale={locale}
          startYear={startYear}
          endYear={endYear}
          monthLabel={monthLabel}
          yearLabel={yearLabel}
        />
      )}
      theme={calendarTheme}
    />
  );
}