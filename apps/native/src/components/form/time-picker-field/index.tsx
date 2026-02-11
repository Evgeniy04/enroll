import {
  FormatTimeOptions,
  TimeProps,
} from "@/components/form/time-picker-field/time-picker-field.types";
import { formatTime } from "@/components/form/time-picker-field/utils/formatTime";
import { Button } from "@/components/ui/button";
import { BaseFieldProps, FormField } from "@/components/ui/field";
import { Text } from "@/components/ui/text";
import { useFieldContext } from "@/hooks/forms/formContext";
import { useColorScheme } from "nativewind";
import { FC, useState } from "react";
import {
  TimerPickerModal,
  TimerPickerModalProps,
} from "react-native-timer-picker";

interface TimePickerFieldProps
  extends
    BaseFieldProps,
    Omit<TimerPickerModalProps, "onConfirm" | "visible" | "setIsVisible"> {
  defaultValue?: TimeProps;
  modalTitle: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  formatOptions?: FormatTimeOptions;
}

const TimePickerField: FC<TimePickerFieldProps> = ({
  label,
  description,
  required = false,
  disabled = false,
  defaultValue,
  modalTitle,
  placeholder,
  confirmText = "Выбрать",
  cancelText = "Отменить",
  formatOptions,
  ...props
}) => {
  const field = useFieldContext<TimeProps>();
  const { colorScheme } = useColorScheme();
  const [visible, setIsVisible] = useState(false);
  const [internalValue, setInternalValue] = useState<TimeProps>(
    defaultValue ?? { hours: 0, minutes: 0 },
  );

  const currentValue = field.state.value ? field.state.value : internalValue;

  const displayValue = formatTime(currentValue, formatOptions);

  const handleOpenPress = () => setIsVisible(true);

  const handleCancelPress = () => setIsVisible(false);

  const handleConfirm = (picked: TimeProps) => {
    if (!field.state.value) {
      setInternalValue(picked);
    }

    field.handleChange?.(picked);
    setIsVisible(false);
  };

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      errors={field.state.meta.errors}
    >
      <Button variant="outline" onPress={handleOpenPress} disabled={disabled}>
        <Text>{placeholder ?? displayValue}</Text>
      </Button>

      <TimerPickerModal
        {...props}
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
        styles={{ theme: colorScheme ?? "light" }}
      />
    </FormField>
  );
};

export default TimePickerField;
