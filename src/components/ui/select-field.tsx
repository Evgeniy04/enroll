import { FormField, FormFieldProps } from "@/components/ui/form-field";
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
import { ContentInsets } from "@/hooks/useContentInsets";
import React, { FC } from "react";

export interface SelectValueProps {
  value?: Option;
  onValueChange?: (option: Option) => void;
}

interface SelectFieldProps extends FormFieldProps, SelectValueProps {
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
  groupLabel?: string;
  disabled?: boolean;
  contentInsets: ContentInsets;
}

export const SelectField: FC<SelectFieldProps> = ({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  // CurrentField
  value,
  onValueChange,
  placeholder,
  options,
  groupLabel,
  contentInsets,
}) => {
  return (
    <FormField
      nativeID={nativeID}
      label={label}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
    >
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        aria-labelledby={nativeID}
      >
        <SelectTrigger
          nativeID={nativeID}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${nativeID}-error`
              : helperText
                ? `${nativeID}-helper`
                : undefined
          }
          className={error ? "border-destructive" : ""}
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
