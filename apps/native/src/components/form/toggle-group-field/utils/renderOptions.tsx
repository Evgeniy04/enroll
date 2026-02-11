import { ToggleGroupdFieldProps } from "@/components/form/toggle-group-field/toggle-group-field.types";
import { Text } from "@/components/ui/text";
import { ToggleGroupIcon, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { View } from "react-native";

export const renderOptions = (
  props: Pick<
    ToggleGroupdFieldProps,
    | "options"
    | "disabled"
    | "orientation"
    | "className"
    | "textClassName"
    | "iconClassName"
  >,
) => {
  const {
    options,
    disabled,
    orientation,
    className,
    textClassName,
    iconClassName,
  } = props;
  const allIconsOnly = options.every((option) => !option.showText);

  return options.map((option, index) => {
    const textLines = option.numberOfLines ?? 3;

    return (
      <ToggleGroupItem
        key={option.value}
        value={option.value}
        isFirst={index === 0}
        isLast={index === options.length - 1}
        disabled={disabled}
        className={allIconsOnly ? "flex-1" : "h-auto flex-1 self-stretch"}
      >
        <View
          className={cn(
            "items-center justify-center gap-1",
            orientation === "horizontal" ? "flex-row px-3 py-1" : "py-2",
            className,
          )}
        >
          {option.icon && (
            <ToggleGroupIcon as={option.icon} className={iconClassName} />
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
};
