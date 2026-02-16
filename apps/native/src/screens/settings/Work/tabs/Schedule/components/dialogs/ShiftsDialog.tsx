import { Card, CardContent } from "@/components/ui/card";
import { DatePickerValue } from "@/components/ui/date-picker";
import { NumberPickerField } from "@/components/ui/number-picker-field";
import { Option } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { ToggleGroupField } from "@/components/ui/toggle-group-field";
import { useContentInsets } from "@/hooks/useContentInsets";
import { BaseDialog } from "@/screens/settings/Work/tabs/Schedule/components/dialogs/BaseDialog";
import { RangeDatePicker } from "@/screens/settings/Work/tabs/Schedule/components/fields/RangeDatePicker";
import { TemplateSelect } from "@/screens/settings/Work/tabs/Schedule/components/fields/TempleteSelect";
import { ShiftsValue } from "@/screens/settings/Work/tabs/Schedule/components/types/filling-tools";
import { BriefcaseBusiness, Scissors } from "lucide-react-native";
import { FC, useState } from "react";
import { View } from "react-native";

interface ShiftsDialogProps {
  onConfirm: (value: ShiftsValue) => void;
  templates: {
    label: string;
    value: string;
  }[];
}

export const ShiftsDialog: FC<ShiftsDialogProps> = ({
  onConfirm,
  templates,
}) => {
  const contentInsets = useContentInsets();
  const [selectedPreset, setSelectedPreset] = useState<string>("5/2");
  const [weekDays, setWeekDays] = useState({ working: 5, weekend: 2 });
  const [range, setRange] = useState<DatePickerValue>();
  const [template, setTemplate] = useState<Option>();

  const disabled = !range?.start || !range?.end || !template;

  const handleConfirm = () => {
    if (!range?.start || !range?.end || !template) return;

    onConfirm({
      weekDays,
      startDate: range.start,
      endDate: range.end,
      template: template.value,
    });
  };

  const handleSelectedPresetChange = (value?: string) => {
    if (!value) return;
    setSelectedPreset(value);

    const [working, weekend] = value.split("/").map(Number);
    setWeekDays({ working, weekend });
  };

  const handleWorkingDaysChange = (working: number) => {
    setWeekDays((prev) => ({ ...prev, working }));
    setSelectedPreset(`${working}/${weekDays.weekend}`);
  };
  const handleWeekendDaysChange = (weekend: number) => {
    setWeekDays((prev) => ({ ...prev, weekend }));
    setSelectedPreset(`${weekDays.working}/${weekend}`);
  };

  return (
    <BaseDialog
      title="График работы"
      description="Настройте рабочие дни, применив выбранные шаблоны."
      confirmDisabled={disabled}
      onConfirm={handleConfirm}
    >
      <ToggleGroupField
        nativeID="shifts-preset-selector"
        label="Популярные графики"
        type="single"
        orientation="vertical"
        variant="outline"
        value={selectedPreset}
        onValueChange={handleSelectedPresetChange}
        options={[
          {
            value: "5/2",
            label: "5 / 2",
            icon: BriefcaseBusiness,
            showText: true,
          },
          { value: "2/2", label: "2 / 2", icon: Scissors, showText: true },
        ]}
        className="py-3"
        textClassName="text-lg"
      />

      <Card className="p-2">
        <CardContent className="gap-3 p-2">
          <View className="flex-row justify-between gap-3">
            <NumberPickerField
              nativeID="working-days-picker"
              label="Рабочих дней"
              value={weekDays.working}
              onChange={handleWorkingDaysChange}
              step={1}
              min={1}
              max={14}
              unit="д."
              formClassName="flex-1"
            />
            <NumberPickerField
              nativeID="weekend-days-picker"
              label="Выходных дней"
              value={weekDays.weekend}
              onChange={handleWeekendDaysChange}
              step={1}
              min={1}
              max={14}
              unit="д."
              formClassName="flex-1"
            />
          </View>
          <Text variant="code" className="text-center">
            Настройте собственный график
          </Text>
        </CardContent>
      </Card>

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
