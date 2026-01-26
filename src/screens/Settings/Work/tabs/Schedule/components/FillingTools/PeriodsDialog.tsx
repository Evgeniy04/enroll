import { Button } from '@/components/ui/button';
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
import { Text } from '@/components/ui/text';
import { useContentInsets } from '@/hooks/useContentInsets';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useState } from "react";
import { View } from 'react-native';

export interface PeriodsValue {
  startDate: Dayjs;
  endDate: Dayjs;
  template: string;
}

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
  const { width: screenWidth } = useWindowDimensions();
  const contentInsets = useContentInsets();
  const [ selectedRangeDate, setSelectedRangeDate ] = useState<DatePickerValue>();
  const [ template, setTemplate ] = useState<Option>();

  const now = dayjs();
  const year = now.year();
  const disabled = !selectedRangeDate?.start || !selectedRangeDate?.end || !template;

  const handleConfirm = () => {
    if (!selectedRangeDate?.start || !selectedRangeDate?.end || !template) return;

    onConfirm({
      startDate: selectedRangeDate.start,
      endDate: selectedRangeDate.end,
      template: template.value,
    });
  };

  const handleTemplateChange = (value: Option | undefined) => {
    setTemplate(value);
  };

  return (
    <DialogContent style={{ width: screenWidth - 40, alignSelf: 'center' }}>
      <DialogHeader>
        <DialogTitle>Выбор периода</DialogTitle>
        <DialogDescription>
          Укажите даты, на которые нужно применить выбранный шаблон.
        </DialogDescription>
      </DialogHeader>

      <View className="gap-3">
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