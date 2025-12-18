import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import React from 'react';
import { TextInputProps, View } from 'react-native';

interface TextFieldProps extends TextInputProps {
  nativeID: string;
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export function TextField({
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  ...inputProps
}: TextFieldProps) {
  return (
    <View className="gap-1.5">
      <Label nativeID={nativeID} className={disabled ? 'opacity-50' : ''}>
        {label}
        {required && <Text className="text-destructive"> *</Text>}
      </Label>
      <Input
        aria-labelledby={nativeID}
        aria-invalid={!!error}
        aria-describedby={error ? `${nativeID}-error` : helperText ? `${nativeID}-helper` : undefined}
        editable={!disabled}
        className={error ? 'border-destructive' : ''}
        {...inputProps}
      />
      {error && (
        <Text
          nativeID={`${nativeID}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </Text>
      )}
      {!error && helperText && (
        <Text
          nativeID={`${nativeID}-helper`}
          className="text-sm text-muted-foreground"
        >
          {helperText}
        </Text>
      )}
    </View>
  );
}