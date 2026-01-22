import { FormFieldProps } from '@/components/ui/form-field';
import { ContentInsets } from '@/hooks/useContentInsets';

export interface DatePickerFieldContactProps {
  helperText?: string;
  currentDate?: Date;
  setCurrentDate: (date: Date) => void;
  title?: string;
  minDate?: string;
  maxDate?: string;
  startYear?: number;
  endYear?: number;
  contentInsets: ContentInsets;
}

export interface DatePickerFieldProps extends FormFieldProps, DatePickerFieldContactProps {
  placeholder?: string;
  side?: 'top' | 'bottom';
}
