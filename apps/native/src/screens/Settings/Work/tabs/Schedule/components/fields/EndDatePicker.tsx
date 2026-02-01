import { DatePickerValue } from "@/components/ui/date-picker";
import { DatePickerField } from "@/components/ui/date-picker-field";
import { ContentInsets } from "@/hooks/useContentInsets";
import dayjs from "dayjs";
import { FC } from "react";

interface EndDatePickerProps {
  helperText: string;
  value?: DatePickerValue;
  onChange: (value?: DatePickerValue) => void;
  contentInsets: ContentInsets;
}

export const EndDatePicker: FC<EndDatePickerProps> = ({
  helperText,
  value,
  onChange,
  contentInsets,
}) => {
  const now = dayjs();
  const year = now.year();

  return (
    <DatePickerField
      nativeID="end-date"
      label="Конечная дата"
      helperText={helperText}
      currentValue={value}
      setCurrentValue={onChange}
      startYear={year}
      endYear={year + 1}
      minDate={now.toString()}
      maxDate={now.add(1, "year").toString()}
      contentInsets={contentInsets}
    />
  );
};
