import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePickerValue } from '@/components/ui/date-picker';
import { DatePickerField } from '@/components/ui/date-picker-field';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Option } from '@/components/ui/select';
import { SelectField } from '@/components/ui/select-field';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { ToggleGroupField } from '@/components/ui/toggle-group-field';
import { useContentInsets } from '@/hooks/useContentInsets';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import dayjs, { Dayjs } from 'dayjs';
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

export interface WeeksValue {
  selectedDays: string[],
  endDate?: Dayjs;
  template: string;
}

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
  const { width: screenWidth } = useWindowDimensions();
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

  const handleTemplateChange = (value: Option | undefined) => {
    setTemplate(value);
  };

  const now = dayjs();
  const year = now.year();

  return (
    <DialogContent style={{ width: screenWidth - 40, alignSelf: 'center' }}>
      <DialogHeader>
        <DialogTitle>Дни недели</DialogTitle>
        <DialogDescription>
          Повторяющиеся дни.
        </DialogDescription>
      </DialogHeader>

      <View className="gap-3">
        <ToggleGroupField
          nativeID="weekdays-selector"
          label="Выберите дни недели"
          type="multiple"
          variant="outline"
          value={selectedDays}
          onValueChange={setSelectedDays}
          options={weekdayOptions}
          presets={presets}
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
          <DatePickerField
            nativeID="end-date"
            label="Конечная дата"
            helperText="Шаблон применится на все выбранные дни недели до этой даты."
            currentValue={endDate}
            setCurrentValue={setEndDate}
            startYear={year}
            endYear={year + 1}
            minDate={now.toString()}
            maxDate={now.add(1, 'year').toString()}
            contentInsets={contentInsets}
          />
        )}

        <SelectField
          nativeID={`select-template`}
          label="Применённый шаблон"
          groupLabel="Шаблон"
          placeholder="Выходной"
          value={template}
          onValueChange={handleTemplateChange}
          options={templates}
          contentInsets={contentInsets}
        />
      </View>

      <DialogFooter className="flex-row-reverse">
        <DialogClose asChild>
          <Button className="flex-1" variant="outline">
            <Text>Закрыть</Text>
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button className="flex-1" onPress={handleConfirm} disabled={disabled}>
            <Text>Применить</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};