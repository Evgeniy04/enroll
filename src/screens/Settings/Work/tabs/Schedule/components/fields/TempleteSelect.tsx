import { Option } from "@/components/ui/select";
import { SelectField } from "@/components/ui/select-field";
import { ContentInsets } from "@/hooks/useContentInsets";
import { FC } from "react";

interface TemplateSelectProps {
  value?: Option;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value?: Option) => void;
  disabled?: boolean;
  contentInsets: ContentInsets;
}

export const TemplateSelect: FC<TemplateSelectProps> = ({
  value,
  options,
  onChange,
  disabled,
  contentInsets,
}) => (
  <SelectField
    nativeID="select-template"
    label="Применённый шаблон"
    groupLabel="Шаблон"
    placeholder="Выходной"
    value={value}
    onValueChange={onChange}
    options={options}
    contentInsets={contentInsets}
    disabled={disabled}
  />
);
