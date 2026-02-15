import { BaseFieldProps, FormField } from "@/components/ui/field";
import {
  Option,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "@/hooks/forms/formContext";
import { ContentInsets } from "@/hooks/useContentInsets";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface SelectFieldProps extends BaseFieldProps {
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
  groupLabel?: string;
  contentInsets: ContentInsets;
}

export const SelectField: FC<SelectFieldProps> = ({
  label,
  description,
  required = false,
  disabled = false,
  placeholder,
  options,
  groupLabel,
  contentInsets,
}) => {
  const field = useFieldContext<Option>();

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      errors={field.state.meta.errors}
    >
      <Select
        value={field.state.value}
        onValueChange={field.handleChange}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(!field.state.meta.isValid && "border-destructive")}
          disabled={disabled}
        >
          <SelectValue placeholder={placeholder} className="flex-1" />
        </SelectTrigger>

        <SelectContent insets={contentInsets} className="max-h-80">
          <SelectGroup>
            {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                label={option.label}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormField>
  );
};
