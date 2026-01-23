import { DatePickerValue } from '@/components/ui/date-picker';
import { FormFieldProps } from '@/components/ui/form-field';
import { ContentInsets } from '@/hooks/useContentInsets';

export interface DatePickerFieldContactProps {
  helperText?: string;
  currentValue?: DatePickerValue;
  setCurrentValue: (date: DatePickerValue) => void;
  title?: string;
  minDate?: string;
  maxDate?: string;
  startYear?: number;
  endYear?: number;
  contentInsets: ContentInsets;
  rangeSelection?: boolean;
}

export interface DatePickerFieldProps extends FormFieldProps, DatePickerFieldContactProps {
  placeholder?: string;
  side?: 'top' | 'bottom';
}
