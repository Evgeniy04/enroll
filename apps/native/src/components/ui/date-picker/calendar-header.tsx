import {
  generateMonthOptions,
  generateYearOptions,
} from "@/components/ui/date-picker/calendar-utils";
import { HeaderSelect } from "@/components/ui/date-picker/header-select";
import { ContentInsets } from "@/hooks/useContentInsets";
import { cn } from "@/lib/utils";
import { Option } from "@rn-primitives/select";
import dayjs from "dayjs";
import { FC, useCallback, useMemo } from "react";
import { View } from "react-native";

type CalendarHeaderProps = {
  currentDate: Date;
  onChangeDate?: (previousDate: Date) => void;
  addMonth?: (count: number) => void;
  contentInsets: ContentInsets;
  startYear?: number;
  endYear?: number;
  className?: string;
};

export const CalendarHeader: FC<CalendarHeaderProps> = ({
  currentDate,
  onChangeDate,
  addMonth,
  contentInsets,
  startYear = 1950,
  endYear = new Date().getFullYear(),
  className,
}) => {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthLabels = useMemo(() => dayjs.months(), []);

  const monthOptions = useMemo(
    () => generateMonthOptions(monthLabels),
    [monthLabels],
  );
  const yearOptions = useMemo(
    () => generateYearOptions(startYear, endYear),
    [startYear, endYear],
  );

  const handleMonthChange = useCallback(
    (option?: Option) => {
      if (!option) return;
      onChangeDate &&
        onChangeDate(
          dayjs(currentDate)
            .add(Number(option.value) - month, "month")
            .toDate(),
        );
      addMonth && addMonth(Number(option.value) - month);
    },
    [onChangeDate, addMonth, currentDate, month],
  );

  const handleYearChange = useCallback(
    (option?: Option) => {
      if (!option) return;
      onChangeDate &&
        onChangeDate(
          dayjs(currentDate)
            .add(Number(option.value) - year, "year")
            .toDate(),
        );
      addMonth && addMonth((Number(option.value) - year) * 12);
    },
    [onChangeDate, addMonth, currentDate, year],
  );

  const monthValue = useMemo(
    () => ({ value: String(month), label: monthLabels[month] }),
    [month, monthLabels],
  );

  const yearValue = useMemo(
    () => ({ value: String(year), label: String(year) }),
    [year],
  );

  return (
    <View className={cn("flex-row gap-5", className)}>
      <HeaderSelect
        value={monthValue}
        onChange={handleMonthChange}
        placeholder={monthLabels[month]}
        label="Месяц"
        options={monthOptions}
        contentInsets={contentInsets}
      />

      <HeaderSelect
        value={yearValue}
        onChange={handleYearChange}
        placeholder={String(year)}
        label="Год"
        options={yearOptions}
        contentInsets={contentInsets}
      />
    </View>
  );
};
