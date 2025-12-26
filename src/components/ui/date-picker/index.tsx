import { CalendarHeader } from '@/components/ui/date-picker/calendar-header';
import { generateMonthLabels, generateMonthOptions, generateYearOptions } from '@/components/ui/date-picker/calendar-utils';
import { CALENDAR_CONSTANTS, getCalendarTheme } from '@/config';
import { ContentInsets } from '@/hooks/useContentInsets';
import { useRootContext as useRootContextPopover } from '@rn-primitives/popover';
import { format } from 'date-fns';
import { useColorScheme } from 'nativewind';
import { FC, useMemo, useState } from 'react';
import { Calendar, CalendarProps, DateData } from 'react-native-calendars';

type DatePickerProps = {
  currentDate?: Date;
  setCurrentDate: (date: Date) => void;
  contentInsets: ContentInsets;
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

export const DatePicker: FC<DatePickerProps> = ({
  currentDate = new Date(),
  setCurrentDate,
  contentInsets,
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
}) => {
  const { colorScheme } = useColorScheme();
  const { onOpenChange } = useRootContextPopover();
  const [ displayDate, setDisplayDate ] = useState(() => format(currentDate, 'yyyy-MM-dd'));
  const calendarTheme = customTheme ?? getCalendarTheme(colorScheme ?? 'light');

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
          contentInsets={contentInsets}
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