import { BaseFieldProps, FormField } from "@/components/ui/field";
import { NumberPicker, NumberPickerProps } from "@/components/ui/number-picker";
import { useFieldContext } from "@/hooks/forms/formContext";
import { FC } from "react";

interface NumberPickerFieldProps extends BaseFieldProps, NumberPickerProps {
  min?: number;
  max?: number;
  step?: number;
  /** Максимум 3 пресета */
  presets?: number[];
  /** Единица измерения (шт, мин, %, и т.п.) */
  unit?: string;
  isValid?: boolean;
  /** Кастомное форматирование значения */
  formatValue?: (value: number) => string;
}

export const NumberPickerField: FC<NumberPickerFieldProps> = ({
  label,
  description,
  required = false,
  disabled = false,
  ...props
}) => {
  const field = useFieldContext<number>();

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      errors={field.state.meta.errors}
    >
      <NumberPicker
        value={field.state.value}
        onChange={field.handleChange}
        isValid={field.state.meta.isValid}
        disabled={disabled}
        {...props}
      />
    </FormField>
  );
};
