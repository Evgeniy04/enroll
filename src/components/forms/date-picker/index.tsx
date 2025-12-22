import { CalendarHeader } from '@/components/forms/date-picker/calendar-header';
import { generateMonthLabels, generateMonthOptions, generateYearOptions } from '@/components/forms/date-picker/calendar-utils';
import { CALENDAR_CONSTANTS, getCalendarTheme } from '@/config';
import { SelectContentInsets } from '@/hooks/useSelectContentInsets';
import { useRootContext as useRootContextPopover } from '@rn-primitives/popover';
import { format } from 'date-fns';
import { useColorScheme } from 'nativewind';
import { useMemo, useState } from 'react';
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
  const [ displayDate, setDisplayDate ] = useState(() => format(currentDate, 'yyyy-MM-dd'));

  const monthLabels = useMemo(() => generateMonthLabels(locale), [locale]);
  const monthOptions = useMemo(() => generateMonthOptions(monthLabels), [monthLabels]);
  const yearOptions = useMemo(() => generateYearOptions(startYear, endYear), [startYear, endYear]);

  const handleDayPress = (day: DateData) => {
    const selectedDate = new Date(day.dateString);
    setCurrentDate(selectedDate);
    
    if (onClose) {
      onClose();
    } else {
      onOpenChange(false);
    }
  };

  const mergedMarkedDates = useMemo(() => {
    const selectedDateString = format(currentDate, 'yyyy-MM-dd');
    
    return {
      ...markedDates,
      ...(disabledDates?.reduce(
        (acc, date) => ({
          ...acc,
          [date]: { disabled: true, disableTouchEvent: true },
        }),
        {}
      ) ?? {}),
      [selectedDateString]: {
        selected: true,
        ...(markedDates?.[selectedDateString] || {}),
      },
    };
  }, [markedDates, disabledDates, currentDate]);

  return (
    <Calendar
      current={displayDate}
      minDate={minDate}
      maxDate={maxDate}
      markedDates={mergedMarkedDates}
      firstDay={firstDay}
      enableSwipeMonths
      onDayPress={handleDayPress}
      onMonthChange={(date: DateData) => {
        setDisplayDate(date.dateString);
      }}
      customHeader={(props: any) => (
        <CalendarHeader
          {...props}
          selectContentInsets={selectContentInsets}
          monthLabels={monthLabels}
          monthOptions={monthOptions}
          yearOptions={yearOptions}
          monthLabel={monthLabel}
          yearLabel={yearLabel}
        />
      )}
      theme={calendarTheme}
    />
  );
}