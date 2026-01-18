import { Button } from '@/components/ui/button';
import { DatePickerContent } from '@/components/ui/date-picker-field/date-picker-field-content';
import { DatePickerFieldProps } from '@/components/ui/date-picker-field/date-picker-field.types';
import { FormField } from '@/components/ui/form-field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { useContentInsets } from '@/hooks/useContentInsets';
import dayjs from 'dayjs';
import { FC } from 'react';

export const DatePickerField: FC<DatePickerFieldProps> = ({
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
  placeholder = currentDate ? dayjs(currentDate).format('DD MMMM YYYY') : title,
  startYear,
  endYear,
  minDate,
  maxDate,
  side = 'top',
}) => {
  const contentInsets = useContentInsets();
  placeholder = currentDate ? dayjs(currentDate).format('DD MMMM YYYY') : title;

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
          <Button variant="outline" disabled={disabled}>
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
          <DatePickerContent
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            title={title}
            helperText={helperText}
            minDate={minDate}
            maxDate={maxDate}
            startYear={startYear}
            endYear={endYear}
            contentInsets={contentInsets}
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
};