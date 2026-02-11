import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { ReactNode, useMemo } from "react";
import { View, ViewProps } from "react-native";

export interface BaseFieldProps {
  label: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface FormFieldProps extends BaseFieldProps, ViewProps {
  errors?: ({ message?: string } | undefined)[];
  children: ReactNode;
}

export function FormField({
  label,
  description,
  required,
  disabled,
  errors,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <Field className={className} {...props}>
      <FieldLabel required={required} disabled={disabled}>
        {label}
      </FieldLabel>

      {children}

      {description && <FieldDescription>{description}</FieldDescription>}

      <FieldError errors={errors} />
    </Field>
  );
}

export function Field({ className, ...props }: ViewProps) {
  return <View role="group" className={cn("gap-1.5", className)} {...props} />;
}

export function FieldLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<typeof Label> & { required?: boolean }) {
  return (
    <Label
      className={cn(props.disabled ? "opacity-50" : "", className)}
      {...props}
    >
      {children}
      {required && <Text className="text-destructive"> *</Text>}
    </Label>
  );
}

export function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn(
        "text-left text-sm font-normal leading-normal text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function FieldError({
  className,
  children,
  errors,
  ...props
}: ViewProps & {
  errors?: ({ message?: string } | undefined)[];
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <View className="gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && (
              <Text
                key={index}
                className="text-sm text-destructive"
                role="alert"
              >
                {error.message}
              </Text>
            ),
        )}
      </View>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <View className={className} {...props}>
      {content}
    </View>
  );
}
