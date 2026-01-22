import { FormField, FormFieldProps } from '@/components/ui/form-field';
import { Text } from '@/components/ui/text';
import { toggleVariants } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react-native';
import { FC, useMemo } from 'react';
import { View } from 'react-native';

interface ToggleOption {
  label: string;
  value: string;
  icon?: LucideIcon;
  showText?: boolean;
  numberOfLines?: number;
}

interface ToggleGroupFieldBaseProps extends FormFieldProps {
  options: ToggleOption[];
  disabled?: boolean;
  variant?: VariantProps<typeof toggleVariants>['variant'];
  size?: VariantProps<typeof toggleVariants>['size'];
  orientation?: 'horizontal' | 'vertical';
}

interface ToggleGroupFieldSingleProps extends ToggleGroupFieldBaseProps {
  type: 'single';
  value: string;
  onValueChange: (value?: string) => void;
}

interface ToggleGroupFieldMultipleProps extends ToggleGroupFieldBaseProps {
  type: 'multiple';
  value: string[];
  onValueChange: (value: string[]) => void;
}

type ToggleGroupFieldProps =
  | ToggleGroupFieldSingleProps
  | ToggleGroupFieldMultipleProps;

export const ToggleGroupField: FC<ToggleGroupFieldProps> = ({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,

  // ToggleGroupField
  value,
  onValueChange,
  options,
  type,
  variant,
  size,
  orientation = 'horizontal',
}) => {
  const allIconsOnly = useMemo(
    () => options.every(option => !option.showText),
    [options]
  );

  const renderOptions = useMemo(() => {
    return options.map((option, index) => {
      const textLines = option.numberOfLines ?? 3;

      return (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          isFirst={index === 0}
          isLast={index === options.length - 1}
          disabled={disabled}
          className={cn(allIconsOnly ? 'flex-1' : 'flex-1 self-stretch h-auto')}
        >
          <View
            className={cn(
              'justify-center items-center gap-1',
              orientation === 'horizontal' ? 'flex-row px-3 py-1' : 'py-2'
            )}
          >
            {option.icon && <ToggleGroupIcon as={option.icon} />}
            {option.showText && (
              <Text className="text-xs text-center" numberOfLines={textLines}>
                {option.label}
              </Text>
            )}
          </View>
        </ToggleGroupItem>
      );
    });
  }, [allIconsOnly, disabled, options, orientation]);

  return (
    <FormField
      nativeID={nativeID}
      label={label}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
    >
      {type === 'single' ? (
        <ToggleGroup
          type='single'
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          variant={variant}
          size={size}
        >
          {renderOptions}
        </ToggleGroup>
      ) : (
        <ToggleGroup
          type='multiple'
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          variant={variant}
          size={size}
        >
          {renderOptions}
        </ToggleGroup>
      )}
    </FormField>
  );
};
