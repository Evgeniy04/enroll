import { ToggleGroupdFieldProps } from "@/components/form/toggle-group-field/toggle-group-field.types";
import { renderOptions } from "@/components/form/toggle-group-field/utils/renderOptions";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/field";
import { Text } from "@/components/ui/text";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useFieldContext } from "@/hooks/forms/formContext";
import { FC } from "react";
import { View } from "react-native";

export const Single: FC<ToggleGroupdFieldProps> = ({
  label,
  description,
  required = false,
  disabled = false,
  options,
  variant,
  size,
  orientation = "horizontal",
  presets = [],
  className,
  textClassName,
  iconClassName,
}) => {
  const field = useFieldContext<string | undefined>();

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      errors={field.state.meta.errors}
    >
      <ToggleGroup
        type="single"
        value={field.state.value}
        onValueChange={field.handleChange}
        disabled={disabled}
        variant={variant}
        size={size}
      >
        {renderOptions({
          options,
          disabled,
          orientation,
          className,
          textClassName,
          iconClassName,
        })}
      </ToggleGroup>

      {presets.length > 0 && (
        <View className="mt-2 flex-row flex-wrap justify-center gap-2">
          {presets.slice(0, 3).map((preset) => {
            const active =
              preset.values.length === 1 &&
              field.state.value === preset.values[0];

            const applyPreset = () => field.handleChange(preset.values[0]);

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
