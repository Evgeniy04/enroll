import { Button } from '@/components/ui/button';
import { FormField, FormFieldProps } from '@/components/ui/form-field';
import { Text } from '@/components/ui/text';
import { FormatTimeOptions, TimeProps } from '@/components/ui/time-picker-field/time-picker-field.types';
import { formatTime } from '@/components/ui/time-picker-field/utils/formatTime';
import { useColorScheme } from 'nativewind';
import { FC, useCallback, useMemo, useState } from 'react';
import { TimerPickerModal, TimerPickerModalProps } from 'react-native-timer-picker';

interface TimePickerFieldProps
  extends Omit<
    TimerPickerModalProps, 'onConfirm' | 'visible' | 'setIsVisible'
  >, 
  FormFieldProps 
{
  value?: TimeProps;
  defaultValue?: TimeProps;
  onChange?: (value: TimeProps) => void;
  modalTitle: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  formatOptions?: FormatTimeOptions;
}

export const TimePickerField: FC<TimePickerFieldProps> = ({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required,
  disabled,

  // Field
  value,
  defaultValue,
  onChange,
  modalTitle,
  placeholder,
  confirmText = 'Выбрать',
  cancelText = 'Отменить',
  formatOptions,
  ...modalProps
}) => {
  const { colorScheme } = useColorScheme();
  const [ visible, setIsVisible ] = useState(false);
  const [ internalValue, setInternalValue ] = useState<TimeProps>(
    defaultValue ?? { hours: 0, minutes: 0 }
  );

  const currentValue = value ? value : internalValue;

  const displayValue = useMemo(
    () => formatTime(currentValue, formatOptions),
    [currentValue, formatOptions]
  );

  const handleOpenPress = useCallback(() => {
    setIsVisible(true);
  }, [setIsVisible]);

  const handleCancelPress = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleConfirm = useCallback(
    (picked: TimeProps) => {
      if (!value) {
        setInternalValue(picked);
      }

      onChange?.(picked);
      setIsVisible(false);
    },
    [value, onChange, setIsVisible]
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
      <Button variant="outline" onPress={handleOpenPress} disabled={disabled}>
        <Text aria-labelledby={nativeID}>
          {placeholder ?? displayValue}
        </Text>
      </Button>

      <TimerPickerModal
        {...modalProps}
        initialValue={internalValue}
        visible={visible}
        setIsVisible={setIsVisible}
        onCancel={handleCancelPress}
        onConfirm={handleConfirm}
        modalTitle={modalTitle}
        cancelButtonText={cancelText}
        confirmButtonText={confirmText}
        dayLabel="д"
        hourLabel="ч"
        minuteLabel="м"
        secondLabel="с"
        styles={{ theme: colorScheme ?? 'light' }}
      />
    </FormField>
  );
};