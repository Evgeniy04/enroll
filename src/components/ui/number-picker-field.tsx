import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FormField, FormFieldProps } from '@/components/ui/form-field';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react-native';
import React, { FC } from 'react';
import { View } from 'react-native';

const formatNumberValue = (
  value: number,
  formatValue?: (value: number) => string,
  unit?: string
) => {
  if (formatValue) return formatValue(value);
  if (unit) return `${value} ${unit}`;
  return value.toString();
};

export interface NumberPickerFieldProps extends FormFieldProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Максимум 3 пресета */
  presets?: number[];
  /** Единица измерения (шт, мин, %, и т.п.) */
  unit?: string;
  /** Кастомное форматирование значения */
  formatValue?: (value: number) => string;
}

export const NumberPickerField: FC<NumberPickerFieldProps> = ({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,

  // Field
  value = 0,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  presets = [],
  unit,
  formatValue,
}) => {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const handleIncrementPress = () => onChange?.(clamp(value + step));
  const handleDecrementPress = () => onChange?.(clamp(value - step));

  return (
    <FormField
      nativeID={nativeID}
      label={label}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
    >
      <View
        aria-labelledby={nativeID}
        aria-invalid={!!error}
        aria-describedby={error ? `${nativeID}-error` : helperText ? `${nativeID}-helper` : undefined}
        className={cn(disabled && 'opacity-50')}
      >
        <Card
          className={cn(
            'flex-row items-center justify-between px-1 py-1',
            'dark:bg-input/30 bg-background',
            error ? 'border-destructive' : 'border-border'
          )}
        >
          <Button
            variant="ghost"
            className="size-8"
            disabled={disabled || value <= min}
            onPress={handleDecrementPress}
          >
            <Icon as={Minus} />
          </Button>

          <Text>{formatNumberValue(value, formatValue, unit)}</Text>

          <Button
            variant="ghost"
            className="size-8"
            disabled={disabled || value >= max}
            onPress={handleIncrementPress}
          >
            <Icon as={Plus} />
          </Button>
        </Card>

        {presets.length > 0 && (
          <View className="flex-row flex-wrap gap-2 justify-center mt-2">
            {presets.slice(0, 3).map((preset) => {
              if (preset < min || preset > max) return null;

              const active = preset === value;

              return (
                <Button
                  key={preset}
                  disabled={disabled}
                  variant={active ? 'default' : 'outline'}
                  className="flex-1"
                  onPress={() => onChange?.(clamp(preset))}
                >
                  <Text variant="small">
                    {formatNumberValue(preset, formatValue, unit)}
                  </Text>
                </Button>
              );
            })}
          </View>
        )}
      </View>
    </FormField>
  );
};
