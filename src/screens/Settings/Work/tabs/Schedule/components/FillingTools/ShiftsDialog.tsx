import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { NumberPickerField } from '@/components/ui/number-picker-field';
import { Option } from '@/components/ui/select';
import { SelectField } from '@/components/ui/select-field';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { ToggleGroupField } from '@/components/ui/toggle-group-field';
import { useContentInsets } from '@/hooks/useContentInsets';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import dayjs, { Dayjs } from 'dayjs';
import { BriefcaseBusiness, Scissors } from 'lucide-react-native';
import { FC, useState } from "react";
import { View } from 'react-native';

export interface ShiftsValue {
  weekDays: { working: number, weekend: number };
  startDate: Dayjs;
  endDate: Dayjs;
  template: string;
}

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
  const { width: screenWidth } = useWindowDimensions();
  const contentInsets = useContentInsets();
  const [ selectedPreset, setSelectedPreset ] = useState<string>('5/2');
  const [ weekDays, setWeekDays ] = useState({ working: 5, weekend: 2 });
  const [ selectedRangeDate, setSelectedRangeDate ] = useState<DatePickerValue>();
  const [ template, setTemplate ] = useState<Option>();

  const disabled = !selectedRangeDate?.start || !selectedRangeDate?.end || !template;

  const handleConfirm = () => {
    if (!selectedRangeDate?.start || !selectedRangeDate?.end || !template) return;

    onConfirm({
      weekDays,
      startDate: selectedRangeDate.start,
      endDate: selectedRangeDate.end,
      template: template.value,
    });
  };

  const handleSelectedPresetChange = (value?: string) => {
    if (!value) return;
    setSelectedPreset(value);

    const [ working, weekend ] = value.split('/').map(Number);
    setWeekDays({ working, weekend });
  };

  const handleWorkingDaysChange = (working: number) => {
    setWeekDays((prev) => ({ ...prev, working}));
    setSelectedPreset(`${working}/${weekDays.weekend}`);
  };
  const handleWeekendDaysChange = (weekend: number) => {
    setWeekDays((prev) => ({ ...prev, weekend}));
    setSelectedPreset(`${weekDays.working}/${weekend}`);
  };

  const handleTemplateChange = (value: Option | undefined) => {
    setTemplate(value);
  };

  const now = dayjs();
  const year = now.year();

  return (
    <DialogContent style={{ width: screenWidth - 40, alignSelf: 'center' }}>
      <DialogHeader>
        <DialogTitle>График смен</DialogTitle>
        <DialogDescription>
          Повторяющийся цикл.
        </DialogDescription>
      </DialogHeader>

      <View className="gap-3">
        <ToggleGroupField
          nativeID="shifts-preset-selector"
          label="Популярные графики"
          type="single"
          orientation="vertical"
          variant="outline"
          value={selectedPreset}
          onValueChange={handleSelectedPresetChange}
          options={[
            { value: '5/2', label: '5 / 2', icon: BriefcaseBusiness, showText: true },
            { value: '2/2', label: '2 / 2', icon: Scissors, showText: true },
          ]}
          className='py-3'
          textClassName='text-lg'
        />

        <Card className='p-2'>
          <CardContent className='gap-3 p-2'>
            <View className='flex-row justify-between gap-3'>
              <NumberPickerField
                nativeID="working-days-picker"
                label="Рабочих дней"
                value={weekDays.working}
                onChange={handleWorkingDaysChange}
                step={1}
                min={1}
                max={14}
                unit="д."
                formClassName='flex-1'
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
                formClassName='flex-1'
              />
            </View>
            <Text variant='code' className='text-center'>Настройте собственный график</Text>
          </CardContent>
        </Card>

        <Separator />

        <DatePickerField
          nativeID="range-dates"
          title="Выберите период"
          label="Выбранный период"
          currentValue={selectedRangeDate}
          setCurrentValue={setSelectedRangeDate}
          startYear={year}
          endYear={year + 1}
          minDate={now.toString()}
          maxDate={now.add(1, 'year').toString()}
          contentInsets={contentInsets} // Конфликт инсетсов между Popover и Dialog на Android
          rangeSelection
        />

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