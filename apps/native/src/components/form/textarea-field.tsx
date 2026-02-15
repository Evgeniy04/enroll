import { BaseFieldProps, FormField } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "@/hooks/forms/formContext";
import { cn } from "@/lib/utils";
import { keyboardTypeByType } from "@/utils/keyboardTypeByType";
import { FC, Ref, RefAttributes } from "react";
import { TextInput, TextInputProps } from "react-native";

interface TextareaFieldProps
  extends BaseFieldProps, TextInputProps, RefAttributes<TextInput> {
  inputRef?: Ref<TextInput>;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
}

export const TextareaField: FC<TextareaFieldProps> = ({
  label,
  description,
  required = false,
  disabled = false,
  inputRef,
  type = "text",
  multiline,
  ...props
}) => {
  const field = useFieldContext<string>();

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      errors={field.state.meta.errors}
    >
      <Textarea
        ref={inputRef}
        value={field.state.value}
        onChangeText={field.handleChange}
        onBlur={field.handleBlur}
        editable={!disabled}
        secureTextEntry={type === "password"}
        keyboardType={keyboardTypeByType[type]}
        className={cn(
          !field.state.meta.isValid && "border-destructive",
          multiline && "h-36 align-top",
        )}
        {...props}
      />
    </FormField>
  );
};
