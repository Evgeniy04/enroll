import { DatePickerFieldContent } from "@/components/form/date-picker-field/date-picker-field-content";
import { DatePickerFieldContentProps } from "@/components/form/date-picker-field/date-picker-field.types";
import { Button } from "@/components/ui/button";
import { BaseFieldProps, FormField } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Text } from "@/components/ui/text";
import { useFieldContext } from "@/hooks/forms/formContext";
import { FC, useMemo } from "react";

interface DatePickerFieldProps
  extends BaseFieldProps, DatePickerFieldContentProps {
  placeholder?: string;
  side?: "top" | "bottom";
}

export const DatePickerField: FC<DatePickerFieldProps> = ({
  label,
  description,
  required = false,
  disabled = false,
  title = "Выберите дату",
  placeholder,
  startYear,
  endYear,
  minDate,
  maxDate,
  side = "top",
  contentInsets,
  rangeSelection,
}) => {
  const field = useFieldContext<DatePickerFieldContentProps["value"]>();

  const defaultPlaceholder = useMemo(() => {
    if (!field.state.value) return title;

    const startText = field.state.value.start.format("DD MMMM YYYY");
    if (field.state.value.start.isSame(field.state.value.end)) return startText;

    const endText = field.state.value.end
      ? ` — ${field.state.value.end.format("DD MMMM YYYY")}`
      : "";
    return startText + endText;
  }, [field.state.value, title]);

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      errors={field.state.meta.errors}
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" disabled={disabled}>
            <Text>{placeholder ?? defaultPlaceholder}</Text>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full" insets={contentInsets} side={side}>
          <DatePickerFieldContent
            value={field.state.value}
            onChange={field.handleChange}
            title={title}
            description={description}
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
