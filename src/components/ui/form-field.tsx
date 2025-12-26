import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';

export interface FormFieldProps {
  nativeID: string;
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FormField: FC<FormFieldProps & { children: ReactNode }> = ({
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  children,
}) => {
  return (
    <View className="gap-1.5">
      <Label nativeID={nativeID} className={disabled ? 'opacity-50' : ''}>
        {label}
        {required && <Text className="text-destructive"> *</Text>}
      </Label>
      {children}
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
