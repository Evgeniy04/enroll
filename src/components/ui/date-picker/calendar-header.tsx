import { HeaderSelect } from '@/components/ui/date-picker/header-select';
import { ContentInsets } from '@/hooks/useContentInsets';
import { Option } from '@rn-primitives/select';
import { FC, useCallback, useMemo } from 'react';
import { View } from 'react-native';

type CalendarHeaderProps = {
  current: string;
  addMonth: (count: number) => void;
  contentInsets: ContentInsets;
  monthLabels: string[];
  monthOptions: { value: string; label: string }[];
  yearOptions: { value: string; label: string }[];
  monthLabel?: string;
  yearLabel?: string;
};

export const CalendarHeader: FC<CalendarHeaderProps> = ({
  current,
  addMonth,
  contentInsets,
  monthLabels,
  monthOptions,
  yearOptions,
  monthLabel = 'Месяц',
  yearLabel = 'Год',
}) => {
  const currentDate = useMemo(() => new Date(current), [current]);
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const handleMonthChange = useCallback((option?: Option) => {
    if (!option) return;
    addMonth(Number(option.value) - month);
  }, [addMonth, month]);

  const handleYearChange = useCallback((option?: Option) => {
    if (!option) return;
    addMonth((Number(option.value) - year) * 12);
  }, [addMonth, year]);

  const monthValue = useMemo(
    () => ({ value: String(month), label: monthLabels[month] }),
    [month, monthLabels]
  );

  const yearValue = useMemo(
    () => ({ value: String(year), label: String(year) }),
    [year]
  );
  
  return (
    <View className="flex-row gap-5">
      <HeaderSelect
        value={monthValue}
        onChange={handleMonthChange}
        placeholder={monthLabels[month]}
        label={monthLabel}
        options={monthOptions}
        contentInsets={contentInsets}
      />

      <HeaderSelect
        value={yearValue}
        onChange={handleYearChange}
        placeholder={String(year)}
        label={yearLabel}
        options={yearOptions}
        contentInsets={contentInsets}
      />
    </View>
  );
}