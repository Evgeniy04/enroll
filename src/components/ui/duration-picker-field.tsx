import { FormField, FormFieldProps } from '@/components/ui/form-field';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react-native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from './button';
import { Card } from './card';
import { Icon } from './icon';

export interface DurationFieldProps extends FormFieldProps {
  value?: number;
  onChange?: (value: number | ((previous: number) => number)) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Максимум 3 пресета */
  presets?: number[];
}

export const DurationField: FC<DurationFieldProps> = ({
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
  min = 5,
  max = 480,
  step = 5,
  presets = [15, 30, 60],
}) => {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const handleIncrementPress = () => onChange?.((prev: number) => clamp(prev + step));
  const handleDecrementPress = () => onChange?.((prev: number) => clamp(prev - step));

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
            'dark:bg-input/30 bg-background flex-row items-center justify-between px-1 py-1',
            error ? 'border-destructive' : 'border-border'
          )}
        >
          <Button
            variant='ghost'
            className='size-8'
            disabled={disabled || value <= min}
            onPress={handleDecrementPress}
          >
            <Icon as={Minus} />
          </Button>

          <Text>
            {value} минут
          </Text>

          <Button
            variant='ghost'
            className='size-8'
            disabled={disabled || value >= max}
            onPress={handleIncrementPress}
          >
            <Icon as={Plus} />
          </Button>
        </Card>

        {presets.length > 0 && (
          <View className="flex-row flex-wrap gap-2 justify-center mt-2">
            {presets.slice(0, 3).map((preset: number) => {
                if (preset < min || preset > max) return null;
                const active = preset === value;

                const handleSelectPresetPress = () => onChange?.(clamp(preset));

                return (
                  <Button
                    key={preset.toString()}
                    disabled={disabled}
                    variant={active ? 'default' : 'outline'}
                    className='flex-1'
                    onPress={handleSelectPresetPress}
                  >
                    <Text variant="small">
                      {preset}
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
