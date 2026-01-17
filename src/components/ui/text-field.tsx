import { FormField, FormFieldProps } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FC, Ref } from 'react';
import { TextInput, TextInputProps } from 'react-native';

const keyboardTypeByType: Record<
  NonNullable<TextFieldProps['type']>,
  TextInputProps['keyboardType']
> = {
  text: 'default',
  email: 'email-address',
  password: 'default',
  number: 'numeric',
  tel: 'phone-pad',
  url: 'url',
};

interface TextFieldProps extends FormFieldProps, Omit<TextInputProps, 'nativeID'> {
  inputRef?: Ref<TextInput>;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
}

export const TextField: FC<TextFieldProps> = ({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,

  // Field
  type = 'text',
  multiline,
  inputRef,
  ...inputProps
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
      <Input
        ref={inputRef}
        nativeID={nativeID}
        aria-labelledby={nativeID}
        aria-invalid={!!error}
        aria-describedby={error ? `${nativeID}-error` : helperText ? `${nativeID}-helper` : undefined}
        editable={!disabled}
        secureTextEntry={type === 'password'}
        keyboardType={keyboardTypeByType[type]}
        className={cn(error && 'border-destructive', multiline && 'h-36 align-top')}
        multiline={multiline}
        {...inputProps}
      />
    </FormField>
  );
};
