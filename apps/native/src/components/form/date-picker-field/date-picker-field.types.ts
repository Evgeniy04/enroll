import { DatePickerValue } from "@/components/ui/date-picker";
import { ContentInsets } from "@/hooks/useContentInsets";

export interface DatePickerFieldContentProps {
  description?: string;
  value?: DatePickerValue;
  onChange?: (date: DatePickerValue) => void;
  title?: string;
  minDate?: string;
  maxDate?: string;
  startYear?: number;
  endYear?: number;
  contentInsets: ContentInsets;
  rangeSelection?: boolean;
}
