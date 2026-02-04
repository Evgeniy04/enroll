import { DatePickerValue } from "@/components/ui/date-picker";
import { Option } from "@/components/ui/select";
import { useContentInsets } from "@/hooks/useContentInsets";
import { RangeDatePicker } from "@/screens/settings/Work/tabs/Schedule/components/fields/RangeDatePicker";
import { TemplateSelect } from "@/screens/settings/Work/tabs/Schedule/components/fields/TempleteSelect";
import { PeriodsValue } from "@/screens/settings/Work/tabs/Schedule/components/types/filling-tools";
import { BaseDialog } from "@/screens/settings/Work/tabs/Schedule/components/dialogs/BaseDialog";
import { FC, useState } from "react";

interface PeriodsDialogProps {
  onConfirm: (value: PeriodsValue) => void;
  templates: {
    label: string;
    value: string;
  }[];
}

export const PeriodsDialog: FC<PeriodsDialogProps> = ({
  onConfirm,
  templates,
}) => {
  const contentInsets = useContentInsets();
  const [range, setRange] = useState<DatePickerValue>();
  const [template, setTemplate] = useState<Option>();

  const disabled = !range?.start || !range?.end || !template;

  const handleConfirm = () => {
    if (!range?.start || !range?.end || !template) return;

    onConfirm({
      startDate: range.start,
      endDate: range.end,
      template: template.value,
    });
  };

  return (
    <BaseDialog
      title="Выбор периода"
      description="Укажите даты, на которые нужно применить выбранный шаблон."
      confirmDisabled={disabled}
      onConfirm={handleConfirm}
    >
      <RangeDatePicker
        value={range}
        onChange={setRange}
        contentInsets={contentInsets}
      />
      <TemplateSelect
        value={template}
        options={templates}
        onChange={setTemplate}
        contentInsets={contentInsets}
      />
    </BaseDialog>
  );
};
