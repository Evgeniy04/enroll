import { DatePickerValue } from "@/components/ui/date-picker";
import { Option } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ToggleGroupField } from "@/components/ui/toggle-group-field";
import { useContentInsets } from "@/hooks/useContentInsets";
import { BaseDialog } from "@/screens/settings/Work/tabs/Schedule/components/dialogs/BaseDialog";
import { RangeDatePicker } from "@/screens/settings/Work/tabs/Schedule/components/fields/RangeDatePicker";
import { TemplateSelect } from "@/screens/settings/Work/tabs/Schedule/components/fields/TempleteSelect";
import { WeeksValue } from "@/screens/settings/Work/tabs/Schedule/components/types/filling-tools";
import dayjs from "dayjs";
import { FC, useState } from "react";

const baseWeekday = dayjs().weekday(0);
const weekdayOptions = Array.from({ length: 7 }, (_, i) => {
  const d = baseWeekday.add(i, "day");

  return {
    value: d.locale("en").format("dddd"),
    label: d.format("ddd"),
    showText: true,
  };
});
const presets = [
  {
    label: "Пн-Пт",
    values: weekdayOptions.slice(0, 5).map((w) => w.value),
  },
  {
    label: "Сб-Вс",
    values: weekdayOptions.slice(5).map((w) => w.value),
  },
  {
    label: "Все",
    values: weekdayOptions.map((w) => w.value),
  },
];

interface WeeksDialogProps {
  onConfirm: (value: WeeksValue) => void;
  templates: {
    label: string;
    value: string;
  }[];
}

export const WeeksDialog: FC<WeeksDialogProps> = ({ onConfirm, templates }) => {
  const contentInsets = useContentInsets();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [range, setRange] = useState<DatePickerValue>();
  const [template, setTemplate] = useState<Option>();

  const disabled = !range?.start || !range?.end || !template;

  const handleConfirm = () => {
    if (!range?.start || !range?.end || !template) return;

    onConfirm({
      selectedDays,
      startDate: range.start,
      endDate: range.end,
      template: template.value,
    });
  };

  return (
    <BaseDialog
      title="Дни недели"
      description="Выберите повторяющиеся дни недели для шаблона."
      confirmDisabled={disabled}
      onConfirm={handleConfirm}
    >
      <ToggleGroupField
        nativeID="weekdays-selector"
        label="Выберите дни недели"
        type="multiple"
        variant="outline"
        value={selectedDays}
        onValueChange={setSelectedDays}
        options={weekdayOptions}
        presets={presets}
        className="px-0 py-5"
      />

      <Separator />

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
