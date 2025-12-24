import { DatePicker } from '@/components/forms/date-picker';
import { FormField, FormFieldProps } from '@/components/forms/form-field';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { ContentInsets } from '@/hooks/useContentInsets';
import { View } from 'react-native';

export interface DatePickerFieldProps extends FormFieldProps {
  currentDate?: Date;
  setCurrentDate: (date: Date) => void;
  placeholder?: string;
  title?: string;
  contentInsets: ContentInsets;
  minDate?: string;
  maxDate?: string;
  startYear?: number;
  endYear?: number;
  side?: 'top' | 'bottom';
}

export const DatePickerField = ({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  // CurrentField
  currentDate,
  setCurrentDate,
  title = 'Выберите дату',
  placeholder = 'Выберите дату',
  minDate,
  maxDate,
  startYear,
  endYear,
  side = 'top',
  contentInsets,
}: DatePickerFieldProps) => {
  return (
    <FormField
      nativeID={nativeID}
      label={label}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Text aria-labelledby={nativeID}>
              {placeholder}
            </Text>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-full"
          insets={contentInsets}
          side={side}
        >
          <View className="gap-4">
            <View className="gap-2">
              <Text className="font-medium leading-none">{title}</Text>
              {helperText && (
                <Text className="text-muted-foreground text-sm">
                  {helperText}
                </Text>
              )}
            </View>

            <DatePicker
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              contentInsets={contentInsets}
              minDate={minDate}
              maxDate={maxDate}
              startYear={startYear}
              endYear={endYear}
            />
          </View>
        </PopoverContent>
      </Popover>
    </FormField>
  );
};