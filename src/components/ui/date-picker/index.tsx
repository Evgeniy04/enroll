import { CalendarHeader } from '@/components/ui/date-picker/calendar-header';
import { CALENDAR_CONSTANTS, getCalendarsTheme } from '@/config';
import { ContentInsets } from '@/hooks/useContentInsets';
import dayjs from 'dayjs';
import { useColorScheme } from 'nativewind';
import { FC, useMemo, useState } from 'react';
import { Calendar, CalendarProps, DateData } from 'react-native-calendars';

type DatePickerProps = {
  currentDate?: Date;
  setCurrentDate: (date: Date) => void;
  contentInsets: ContentInsets;
  onClose?: () => void;
  onDayPress?: (day: DateData) => void;
  minDate?: string;
  maxDate?: string;
  disabledDates?: string[];
  markedDates?: Record<string, any>;
  customTheme?: CalendarProps['theme'];
  locale?: string;
  startYear?: number;
  endYear?: number;
  monthLabel?: string;
  yearLabel?: string;
};

export const DatePicker: FC<DatePickerProps> = ({
  currentDate = new Date(),
  contentInsets,
  onDayPress,
  minDate,
  maxDate,
  disabledDates,
  markedDates,
  customTheme,
  startYear,
  endYear,
}) => {
  const { colorScheme } = useColorScheme();
  const [ displayDate, setDisplayDate ] = useState(() => dayjs(currentDate).format('YYYY-MM-DD'));
  const calendarTheme = customTheme ?? getCalendarsTheme(colorScheme ?? 'light');

  const mergedMarkedDates = useMemo(() => {
    const selectedDateString = dayjs(currentDate).format('YYYY-MM-DD');
    
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
      firstDay={CALENDAR_CONSTANTS.FIRST_DAY}
      enableSwipeMonths
      onDayPress={onDayPress}
      onMonthChange={(date: DateData) => {
        setDisplayDate(date.dateString);
      }}
      customHeader={(props: any) => (
        <CalendarHeader
          {...props}
          currentDate={new Date(props.current)}
          contentInsets={contentInsets}
          startYear={startYear}
          endYear={endYear}
        />
      )}
      theme={calendarTheme}
    />
  );
}