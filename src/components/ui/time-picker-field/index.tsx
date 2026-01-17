import { Button } from '@/components/ui/button';
import { FormField, FormFieldProps } from '@/components/ui/form-field';
import { Text } from '@/components/ui/text';
import { formatTime, TimeProps } from '@/components/ui/time-picker-field/utils/formatTime';
import { useColorScheme } from 'nativewind';
import { FC, useCallback, useState } from 'react';
import { TimerPickerModal, TimerPickerModalProps } from 'react-native-timer-picker';

interface TimePickerFieldProps extends FormFieldProps, TimerPickerModalProps {
  onConfirm: (pickedTime: TimeProps) => void;
  visible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  modalTitle: string;
  placeholder?: string;
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
  placeholder,
  confirmText="Выбрать",
  cancelText="Отменить",
  ...props
}) => {
  const { colorScheme } = useColorScheme();
  const [ innerPlaceholder, setInnerPlaceholder ] = useState<string>(formatTime({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }));

  const handleOpenPress = useCallback(() => {
    setIsVisible(true);
  }, [setIsVisible])

  const handleCancel = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleConfirm = useCallback(
    (pickedTime: TimeProps) => {
      onConfirm(pickedTime);
      setInnerPlaceholder(formatTime(pickedTime));
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
      <Button variant="outline" onPress={handleOpenPress}>
        <Text aria-labelledby={nativeID}>
          {placeholder ?? innerPlaceholder}
        </Text>
      </Button>

      <TimerPickerModal
        visible={visible}
        setIsVisible={setIsVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        closeOnOverlayPress
        modalTitle={modalTitle}
        cancelButtonText={cancelText}
        confirmButtonText={confirmText}
        dayLabel="д"
        hourLabel="ч"
        minuteLabel="м"
        secondLabel="с"
        styles={{
          theme: colorScheme ?? 'light',
        }}
        {...props}
      />
    </FormField>
  );
};

export * from '@/components/ui/time-picker-field/utils/formatTime';
