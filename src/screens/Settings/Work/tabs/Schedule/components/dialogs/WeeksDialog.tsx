import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePickerValue } from '@/components/ui/date-picker';
import { Option } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { ToggleGroupField } from '@/components/ui/toggle-group-field';
import { useContentInsets } from '@/hooks/useContentInsets';
import { EndDatePicker } from '@/screens/Settings/Work/tabs/Schedule/components//fields/EndDatePicker';
import { TemplateSelect } from '@/screens/Settings/Work/tabs/Schedule/components//fields/TempleteSelect';
import { WeeksValue } from '@/screens/Settings/Work/tabs/Schedule/components//types/filling-tools';
import { BaseDialog } from '@/screens/Settings/Work/tabs/Schedule/components/dialogs/BaseDialog';
import dayjs from 'dayjs';
import { FC, useState } from "react";
import { Pressable, View } from 'react-native';

const baseWeekday = dayjs().weekday(0);
const weekdayOptions = Array.from({ length: 7 }, (_, i) => {
  const d = baseWeekday.add(i, 'day');

  return {
    value: d.locale('en').format('dddd'),
    label: d.format('ddd'),
    showText: true,
  };
});
const presets = [
  {
    label: 'Пн-Пт',
    values: weekdayOptions.slice(0, 5).map(w => w.value),
  },
  {
    label: 'Сб-Вс',
    values: weekdayOptions.slice(5).map(w => w.value),
  },
  {
    label: 'Все',
    values: weekdayOptions.map(w => w.value),
  },
];

interface WeeksDialogProps {
  onConfirm: (value: WeeksValue) => void;
  templates: {
    label: string;
    value: string;
  }[];
}

export const WeeksDialog: FC<WeeksDialogProps> = ({
  onConfirm,
  templates,
}) => {
  const contentInsets = useContentInsets();
  const [ limitByEndDate, setLimitByEndDate ] = useState(false);
  const [ selectedDays, setSelectedDays ] = useState<string[]>([]);
  const [ endDate, setEndDate ] = useState<DatePickerValue | undefined>();
  const [ template, setTemplate ] = useState<Option>();

  const disabled = !selectedDays.length || !template;

  const toggleLimitByEndDate = () => setLimitByEndDate(prev => !prev);

  const handleConfirm = () => {
    if (!selectedDays.length || !template) return;

    onConfirm({
      selectedDays,
      endDate: endDate?.start,
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
        className='px-0 py-5'
      />

      <Separator />

      <Card className='p-2'>
        <Pressable onPress={toggleLimitByEndDate}>
          <CardContent className="flex-row gap-3 p-2">
            <Checkbox
              checked={limitByEndDate}
              onCheckedChange={setLimitByEndDate}
            />
            <View className='flex-1'>
              <Text className="text-sm font-medium leading-none">Ограничить конечной датой</Text>
              <Text className="text-muted-foreground text-sm">
                Без ограничения — применится на год вперёд.
              </Text>
            </View>
          </CardContent>
        </Pressable>
      </Card>

      {limitByEndDate && (
        <EndDatePicker
          helperText="Шаблон применится на все выбранные дни недели до этой даты."
          value={endDate}
          onChange={setEndDate}
          contentInsets={contentInsets}
        />
      )}

      <TemplateSelect
        value={template}
        options={templates}
        onChange={setTemplate}
        contentInsets={contentInsets}
      />
    </BaseDialog>
  );
};