import { FormField, FormFieldProps } from '@/components/forms/form-field';
import { Input } from '@/components/ui/input';
import React from 'react';
import { TextInputProps } from 'react-native';

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
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
}

export function TextField({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  // CurrentField
  type = 'text',
  ...inputProps
}: TextFieldProps) {
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
        nativeID={nativeID}
        aria-labelledby={nativeID}
        aria-invalid={!!error}
        aria-describedby={error ? `${nativeID}-error` : helperText ? `${nativeID}-helper` : undefined}
        editable={!disabled}
        secureTextEntry={type === 'password'}
        keyboardType={keyboardTypeByType[type]}
        className={error ? 'border-destructive' : ''}
        {...inputProps}
      />
    </FormField>
  );
}
