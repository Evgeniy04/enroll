import { DatePickerField } from '@/components/ui/date-picker-field';
import { ContentInsets } from '@/hooks/useContentInsets';
import dayjs from 'dayjs';
import { FC } from 'react';

interface SpecificDateFieldsProps {
  value?: Date;
  onChange: (date?: Date) => void;
  contentInsets: ContentInsets;
}

export const SpecificDateFields: FC<SpecificDateFieldsProps> = ({
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
      helperText="Клиенты смогут записываться только до выбранной даты."
      currentDate={value}
      setCurrentDate={onChange}
      startYear={year}
      endYear={year + 1}
      minDate={now.toString()}
      maxDate={now.add(1, 'year').toString()}
      contentInsets={contentInsets}
    />
  );
};
