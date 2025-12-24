import { DatePickerField } from '@/components/forms/date-picker-field';
import { useContentInsets } from '@/hooks/useContentInsets';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const DATE_RANGE = {
  min: new Date(1950, 0, 1).toDateString(),
  max: new Date().toDateString(),
  startYear: 1950,
  endYear: new Date().getFullYear(),
};

type DrivingDatePickerProps = {
  nativeID: string;
  label: string;
  helperText: string;
  currentDate?: Date;
  setCurrentDate: (date: Date) => void;
};

export const DrivingDatePicker = ({ nativeID, label, helperText, currentDate, setCurrentDate }: DrivingDatePickerProps) => {
  const contentInsets = useContentInsets();

  const placeholder = currentDate ? format(currentDate, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату';

  return (
    <DatePickerField
      nativeID={nativeID}
      label={label}
      title='Выберите дату'
      helperText={helperText}
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
      placeholder={placeholder}
      minDate={DATE_RANGE.min}
      maxDate={DATE_RANGE.max}
      startYear={DATE_RANGE.startYear}
      endYear={DATE_RANGE.endYear}
      side='top'
      contentInsets={contentInsets}
      required
    />
  );
};
