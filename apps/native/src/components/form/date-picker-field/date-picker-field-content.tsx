import { DatePickerFieldContentProps } from "@/components/form/date-picker-field/date-picker-field.types";
import { Button } from "@/components/ui/button";
import { DatePicker, DatePickerValue } from "@/components/ui/date-picker";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useRootContext as useRootContextPopover } from "@rn-primitives/popover";
import { X } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

const todayDate = new Date();

export const DatePickerFieldContent: FC<DatePickerFieldContentProps> = ({
  description,
  value,
  onChange,
  title,
  startYear = 1950,
  endYear = todayDate.getFullYear(),
  minDate = new Date(startYear, 0, 1).toDateString(),
  maxDate = todayDate.toDateString(),
  contentInsets,
  rangeSelection,
}) => {
  const { onOpenChange } = useRootContextPopover();

  const handleClose = () => onOpenChange?.(false);

  const handleChange = (date: DatePickerValue) => {
    onChange?.(date);

    if (!rangeSelection) {
      handleClose();
    }
  };

  return (
    <View className="gap-4">
      <View className="gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="font-medium leading-none">{title}</Text>
          <Button variant="ghost" size="icon" onPress={handleClose}>
            <Icon as={X} />
          </Button>
        </View>
        {description && (
          <Text className="text-sm text-muted-foreground">{description}</Text>
        )}
      </View>

      <DatePicker
        value={value}
        onChange={handleChange}
        contentInsets={contentInsets}
        minDate={minDate}
        maxDate={maxDate}
        startYear={startYear}
        endYear={endYear}
        rangeSelection={rangeSelection}
      />
    </View>
  );
};
