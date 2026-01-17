import { FormField, FormFieldProps } from '@/components/ui/form-field';
import { TimeProps } from '@/components/ui/time-picker-field/utils/formatTime';
import { cn } from '@/lib/utils';
import { useColorScheme } from 'nativewind';
import { FC, useCallback } from 'react';
import { View } from 'react-native';
import { TimerPickerModal } from 'react-native-timer-picker';

interface TimePickerFieldProps extends FormFieldProps {
  onConfirm: (pickedTime: TimeProps) => void;
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  modalTitle: string;
  confirmText?: string;
  cancelText?: string;
}

export const TimePickerField: FC<TimePickerFieldProps> = ({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,

  // Field
  onConfirm,
  visible,
  setIsVisible,
  modalTitle,
  confirmText="Выбрать",
  cancelText="Отменить",
}) => {
  const { colorScheme } = useColorScheme();

  const handleCancel = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleConfirm = useCallback(
    (pickedTime: TimeProps) => {
      onConfirm(pickedTime);
      setIsVisible(false);
    },
    [onConfirm, setIsVisible],
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
      <View
        aria-labelledby={nativeID}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${nativeID}-error` : helperText ? `${nativeID}-helper` : undefined}
        className={cn(disabled && 'opacity-50')}
      >
        <TimerPickerModal
          visible={visible}
          setIsVisible={setIsVisible}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          closeOnOverlayPress
          modalTitle={modalTitle}
          cancelButtonText={cancelText}
          confirmButtonText={confirmText}
          hourLabel="ч"
          minuteLabel="м"
          secondLabel="с"
          styles={{
            theme: colorScheme ?? 'light',
          }}
        />
      </View>
    </FormField>
  );
};

export * from '@/components/ui/time-picker-field/utils/formatTime';
