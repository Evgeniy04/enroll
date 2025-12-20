import {
  NativeSelectScrollView,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectContentInsets } from '@/hooks/useSelectContentInsets';
import { Option } from '@rn-primitives/select';
import { setMonth, setYear } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

const generateMonthLabels = (locale: string) => {
  return Array.from({ length: 12 }, (_, month) => {
    const name = new Date(2025, month, 1).toLocaleString(locale, {
      month: 'long',
    });
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
};

const generateYearOptions = (startYear: number, endYear: number) => {
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  return years.map((year) => ({
    value: String(year),
    label: String(year),
  }));
};

type CalendarHeaderProps = {
  current: string;
  addMonth: (count: number) => void;
  selectContentInsets: SelectContentInsets;
  locale?: string;
  startYear?: number;
  endYear?: number;
  monthLabel?: string;
  yearLabel?: string;
  className?: string;
};

export function CalendarHeader({
  current,
  addMonth,
  selectContentInsets,
  locale = 'ru-RU',
  startYear = 1950,
  endYear = new Date().getFullYear(),
  monthLabel = 'Месяц',
  yearLabel = 'Год',
}: CalendarHeaderProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date(current));

  const monthLabels = useMemo(() => generateMonthLabels(locale), [locale]);
  
  const monthOptions = useMemo(
    () => monthLabels.map((label, idx) => ({ value: String(idx), label })),
    [monthLabels]
  );

  const yearOptions = useMemo(
    () => generateYearOptions(startYear, endYear),
    [startYear, endYear]
  );

  useEffect(() => {
    setCurrentDate(new Date(current));
  }, [current]);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const handleDateChange = useCallback(
    (type: 'month' | 'year') => (option?: Option) => {
      if (!option) return;
      const value = Number(option.value);
      
      setCurrentDate((prev) => {
        if (type === 'month') return setMonth(prev, value);
        return setYear(prev, value);
      });

      if (type === 'month') {
        addMonth(value - month);
      } else {
        addMonth((value - year) * 12);
      }
    },
    [addMonth, month, year]
  );

  return (
    <View className="flex-row gap-5">
      <View className="flex-1">
        <Select
          value={{ value: String(month), label: monthLabels[month] }}
          onValueChange={handleDateChange('month')}
        >
          <SelectTrigger>
            <SelectValue placeholder={monthLabels[month]} />
          </SelectTrigger>
          <SelectContent insets={selectContentInsets} className="max-h-80">
            <NativeSelectScrollView>
              <SelectGroup>
                <SelectLabel>{monthLabel}</SelectLabel>
                {monthOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </NativeSelectScrollView>
          </SelectContent>
        </Select>
      </View>

      <View className="flex-1">
        <Select
          value={{ value: String(year), label: String(year) }}
          onValueChange={handleDateChange('year')}
        >
          <SelectTrigger>
            <SelectValue placeholder={year.toString()} />
          </SelectTrigger>
          <SelectContent insets={selectContentInsets} className="max-h-80">
            <NativeSelectScrollView>
              <SelectGroup>
                <SelectLabel>{yearLabel}</SelectLabel>
                {yearOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </NativeSelectScrollView>
          </SelectContent>
        </Select>
      </View>
    </View>
  );
}