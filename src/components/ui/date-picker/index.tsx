import { CalendarHeader } from '@/components/ui/date-picker/calendar-header';
import { CALENDAR_CONSTANTS, getCalendarsTheme } from '@/config';
import { ContentInsets } from '@/hooks/useContentInsets';
import dayjs, { Dayjs } from 'dayjs';
import { useColorScheme } from 'nativewind';
import { FC, useMemo, useState } from 'react';
import { Calendar, CalendarProps, DateData } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

export type Range = { start?: Dayjs; end?: Dayjs };

export type DatePickerValue = {
  start: Dayjs;
  end?: Dayjs;
};

type DatePickerProps = {
  currentValue?: DatePickerValue;
  contentInsets: ContentInsets;
  onClose?: () => void;
  setCurrentValue?: (value: DatePickerValue) => void;
  minDate?: string;
  maxDate?: string;
  disabledDates?: string[];
  markedDates?: MarkedDates;
  customTheme?: CalendarProps['theme'];
  locale?: string;
  startYear?: number;
  endYear?: number;
  monthLabel?: string;
  yearLabel?: string;
  rangeSelection?: boolean;
};

export const DatePicker: FC<DatePickerProps> = ({
  currentValue = { start: dayjs() },
  contentInsets,
  setCurrentValue,
  minDate,
  maxDate,
  disabledDates,
  markedDates,
  customTheme,
  startYear,
  endYear,
  rangeSelection = false,
}) => {
  const { colorScheme } = useColorScheme();
  const [ displayDate, setDisplayDate ] = useState(currentValue.start.format('YYYY-MM-DD'));
  const [ range, setRange ] = useState<Range>({});

  const calendarTheme = customTheme ?? getCalendarsTheme(colorScheme ?? 'light');

  const handleDayPress = (day: DateData) => {
    const selectedDate = dayjs(day.dateString);

    if (rangeSelection) {
      if (!range.start || (range.start && range.end)) {
        setRange({ start: selectedDate, end: undefined });
        setCurrentValue?.({ start: selectedDate });
        return;
      }

      if (range.start && !range.end) {
        const start = range.start;
        const end = selectedDate.isBefore(start, 'day') ? start : selectedDate;
        const newStart = selectedDate.isBefore(start, 'day') ? selectedDate : start;
        const finalRange: DatePickerValue = { start: newStart, end };
        setRange(finalRange);
        setCurrentValue?.(finalRange);
        return;
      }
    } else {
      setCurrentValue?.({ start: selectedDate });
    }
  };

  const rangeMarkedDates: MarkedDates = useMemo(() => {
    if (!rangeSelection || !range.start) return {};

    const start = range.start;
    const end = range.end ?? start;

    const result: MarkedDates = {};
    let current = start;

    while (current.isSameOrBefore(end, 'day')) {
      const dateStr = current.format('YYYY-MM-DD');
      const isStart = current.isSame(start, 'day');
      const isEnd = current.isSame(end, 'day');

      result[dateStr] = {
        ...(isStart ? { startingDay: true } : {}),
        ...(isEnd ? { endingDay: true } : {}),
        color: calendarTheme?.selectedDayBackgroundColor,
        textColor: calendarTheme?.selectedDayTextColor,
      };
      current = current.add(1, 'day');
    }

    return result;
  }, [range, rangeSelection, calendarTheme?.selectedDayBackgroundColor, calendarTheme?.selectedDayTextColor]);

  const mergedMarkedDates: MarkedDates = useMemo(() => {
    const result: MarkedDates = {
      ...(markedDates ?? {}),
    };

    if (disabledDates?.length) {
      disabledDates.forEach(date => {
        result[date] = {
          ...(result[date] ?? {}),
          disabled: true,
          disableTouchEvent: true,
        };
      });
    }

    if (rangeSelection) {
      return { ...result, ...rangeMarkedDates };
    }

    const selectedDateString = currentValue.start.format('YYYY-MM-DD');
    result[selectedDateString] = {
      ...(result[selectedDateString] ?? {}),
      selected: true,
    };

    return result;
  }, [markedDates, disabledDates, rangeMarkedDates, rangeSelection, currentValue]);

  return (
    <Calendar
      markingType={rangeSelection ? 'period' : 'dot'}
      current={displayDate}
      minDate={minDate}
      maxDate={maxDate}
      markedDates={mergedMarkedDates}
      firstDay={CALENDAR_CONSTANTS.FIRST_DAY}
      enableSwipeMonths
      onDayPress={handleDayPress}
      onMonthChange={(date: DateData) => setDisplayDate(date.dateString)}
      customHeader={(props: CalendarProps & { current: string }) => (
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
};
