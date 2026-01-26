import { NumberPickerField } from '@/components/ui/number-picker-field';
import { getPluralWord } from '@/utils/plural';
import { FC } from 'react';

interface DaysAheadNumberPickerProps {
  value: number;
  onChange: (value: number) => void;
}

export const DaysAheadNumberPicker: FC<DaysAheadNumberPickerProps> = ({ value, onChange }) => (
  <NumberPickerField
    nativeID="days-ahead"
    label="Количество дней"
    value={value}
    onChange={onChange}
    step={1}
    min={1}
    max={365}
    presets={[7, 14, 30]}
    unit="д."
    helperText={`Клиенты смогут записываться на ближайшие ${value} ${getPluralWord(
      value,
      ['день', 'дня', 'дней'],
    )} от их текущей даты.`}
  />
);
