import { Button } from '@/components/ui/button';
import { DatePickerContent } from '@/components/ui/date-picker-field/date-picker-field-content';
import { DatePickerFieldProps } from '@/components/ui/date-picker-field/date-picker-field.types';
import { FormField } from '@/components/ui/form-field';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Text } from '@/components/ui/text';
import { FC, useMemo } from 'react';

export const DatePickerField: FC<DatePickerFieldProps> = ({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,

  // DatePickerField
  currentValue,
  setCurrentValue,
  title = 'Выберите дату',
  placeholder,
  startYear,
  endYear,
  minDate,
  maxDate,
  side = 'top',
  contentInsets,
  rangeSelection
}) => {
  const defaultPlaceholder = useMemo(() => {
      if (!currentValue) return title;
      
      const startText = currentValue.start.format('DD MMMM YYYY');
      if (currentValue.start.isSame(currentValue.end)) return startText;

      const endText = currentValue.end ? ` — ${currentValue.end.format('DD MMMM YYYY')}` : '';
      return startText + endText;
    },
    [currentValue, title]
  );

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
              {placeholder ?? defaultPlaceholder}
            </Text>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-full"
          insets={contentInsets}
          side={side}
        >
          <DatePickerContent
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            title={title}
            helperText={helperText}
            minDate={minDate}
            maxDate={maxDate}
            startYear={startYear}
            endYear={endYear}
            contentInsets={contentInsets}
            rangeSelection={rangeSelection}
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
};