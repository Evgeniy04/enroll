import {
  NativeSelectScrollView,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContentInsets } from "@/hooks/useContentInsets";
import { Option } from "@rn-primitives/select";
import { FC } from "react";
import { View } from "react-native";

type HeaderSelectOption = {
  value: string;
  label: string;
};

type HeaderSelectProps = {
  value: HeaderSelectOption;
  onChange: (option?: Option) => void;
  placeholder: string;
  label: string;
  options: HeaderSelectOption[];
  contentInsets: ContentInsets;
};

export const HeaderSelect: FC<HeaderSelectProps> = ({
  value,
  onChange,
  placeholder,
  label,
  options,
  contentInsets,
}) => {
  return (
    <View className="flex-1">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent insets={contentInsets} className="max-h-80">
          <NativeSelectScrollView>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>

              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </NativeSelectScrollView>
        </SelectContent>
      </Select>
    </View>
  );
};
