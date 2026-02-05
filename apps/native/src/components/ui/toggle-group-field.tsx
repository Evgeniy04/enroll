import { Button } from "@/components/ui/button";
import { FormField, FormFieldProps } from "@/components/ui/form-field";
import { Text } from "@/components/ui/text";
import { toggleVariants } from "@/components/ui/toggle";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

interface ToggleOption {
  label: string;
  value: string;
  icon?: LucideIcon;
  showText?: boolean;
  numberOfLines?: number;
}

interface TogglePreset {
  label: string;
  values: string[];
}

interface ToggleGroupFieldBaseProps extends FormFieldProps {
  options: ToggleOption[];
  disabled?: boolean;
  variant?: VariantProps<typeof toggleVariants>["variant"];
  size?: VariantProps<typeof toggleVariants>["size"];
  orientation?: "horizontal" | "vertical";
  /** Максимум 3 пресета */
  presets?: TogglePreset[];
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

interface ToggleGroupFieldSingleProps extends ToggleGroupFieldBaseProps {
  type: "single";
  value: string;
  onValueChange: (value?: string) => void;
}

interface ToggleGroupFieldMultipleProps extends ToggleGroupFieldBaseProps {
  type: "multiple";
  value: string[];
  onValueChange: (value: string[]) => void;
}

type ToggleGroupFieldProps =
  | ToggleGroupFieldSingleProps
  | ToggleGroupFieldMultipleProps;

export const ToggleGroupField: FC<ToggleGroupFieldProps> = ({
  // FormField
  nativeID,
  label,
  error,
  helperText,
  required = false,
  disabled = false,

  // ToggleGroupField
  value,
  onValueChange,
  options,
  type,
  variant,
  size,
  /** Максимум 3 пресета */
  presets = [],
  orientation = "horizontal",
  className,
  textClassName,
  iconClassName,
}) => {
  const allIconsOnly = options.every((option) => !option.showText);

  const renderOptions = options.map((option, index) => {
    const textLines = option.numberOfLines ?? 3;

    return (
      <ToggleGroupItem
        key={option.value}
        value={option.value}
        isFirst={index === 0}
        isLast={index === options.length - 1}
        disabled={disabled}
        className={cn(allIconsOnly ? "flex-1" : "h-auto flex-1 self-stretch")}
      >
        <View
          className={cn(
            "items-center justify-center gap-1",
            orientation === "horizontal" ? "flex-row px-3 py-1" : "py-2",
            className,
          )}
        >
          {option.icon && (
            <ToggleGroupIcon as={option.icon} className={cn(iconClassName)} />
          )}
          {option.showText && (
            <Text
              className={cn(
                "text-center text-xs",
                orientation === "horizontal" && "text-sm",
                textClassName,
              )}
              numberOfLines={textLines}
            >
              {option.label}
            </Text>
          )}
        </View>
      </ToggleGroupItem>
    );
  });

  return (
    <FormField
      nativeID={nativeID}
      label={label}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
    >
      {type === "single" ? (
        <ToggleGroup
          type="single"
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          variant={variant}
          size={size}
        >
          {renderOptions}
        </ToggleGroup>
      ) : (
        <ToggleGroup
          type="multiple"
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          variant={variant}
          size={size}
        >
          {renderOptions}
        </ToggleGroup>
      )}
      {presets.length > 0 && (
        <View className="mt-2 flex-row flex-wrap justify-center gap-2">
          {presets.slice(0, 3).map((preset) => {
            const active =
              type === "single"
                ? preset.values.length === 1 && value === preset.values[0]
                : value.length === preset.values.length &&
                  preset.values.every((v) => value.includes(v));

            const applyPreset = () => {
              if (type === "single") {
                onValueChange(preset.values[0]);
              } else {
                onValueChange(preset.values);
              }
            };

            return (
              <Button
                key={preset.label}
                disabled={disabled}
                variant={active ? "default" : "outline"}
                className="flex-1"
                onPress={applyPreset}
              >
                <Text variant="small">{preset.label}</Text>
              </Button>
            );
          })}
        </View>
      )}
    </FormField>
  );
};
