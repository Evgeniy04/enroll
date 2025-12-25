import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { FormField, FormFieldProps } from '@/components/ui/form-field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { ContentInsets, useContentInsets } from '@/hooks/useContentInsets';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { View } from 'react-native';

const todayDate = new Date();

export interface DatePickerFieldProps extends FormFieldProps {
  currentDate?: Date;
  setCurrentDate: (date: Date) => void;
  placeholder?: string;
  title?: string;
  contentInsets?: ContentInsets;
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
  placeholder = currentDate ? format(currentDate, 'dd MMMM yyyy', { locale: ru }) : 'Выберите дату',
  startYear = 1950,
  endYear = todayDate.getFullYear(),
  minDate = new Date(startYear, 0, 1).toDateString(),
  maxDate = todayDate.toDateString(),
  side = 'top',
  contentInsets,
}: DatePickerFieldProps) => {
  contentInsets = useContentInsets();

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