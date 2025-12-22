import {
  NativeSelectScrollView,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectContentInsets } from '@/hooks/useSelectContentInsets';
import { Option } from '@rn-primitives/select';
import { View } from 'react-native';

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
  insets: SelectContentInsets;
};

export function HeaderSelect({
  value,
  onChange,
  placeholder,
  label,
  options,
  insets,
}: HeaderSelectProps) {
  return (
    <View className="flex-1">
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent insets={insets} className="max-h-80">
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
}