import { DatePickerValue } from '@/components/ui/date-picker';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useContentInsets } from '@/hooks/useContentInsets';
import { BaseDialog } from '@/screens/Settings/Work/tabs/Schedule/components/dialogs/BaseDialog';
import { BookingLimitModeSelector } from '@/screens/Settings/Work/tabs/Schedule/components/fields/BookingLimitModeSelector';
import { DaysAheadNumberPicker } from '@/screens/Settings/Work/tabs/Schedule/components/fields/DaysAheadNumberPicker';
import { EndDatePicker } from '@/screens/Settings/Work/tabs/Schedule/components/fields/EndDatePicker';
import { BookingLimitValue } from '@/screens/Settings/Work/tabs/Schedule/components/types/booking-limit';
import dayjs from 'dayjs';
import { FC, useState } from 'react';

interface BookingLimitDialogProps {
  onConfirm: (value: BookingLimitValue) => void;
  initialData: BookingLimitValue;
}

export const BookingLimitDialog: FC<BookingLimitDialogProps> = ({
  onConfirm,
  initialData
}) => {
  const contentInsets = useContentInsets();
  const [ mode, setMode ] = useState<string>(initialData.mode);
  const [ daysAhead, setDaysAhead ] = useState(initialData.daysAhead);
  const [ endDate, setEndDate ] = useState<DatePickerValue | undefined>(
    initialData.endDate && { start: initialData.endDate }
  );

  const handleModeChange = (value?: string) => {
    if (!value) return;
    setMode(value);
  };

  const handleConfirm = () => {
    if (mode !== 'days-ahead' && mode !== 'specific-date' && mode !== 'unlimited') return;
    
    onConfirm({
      mode,
      daysAhead,
      endDate: endDate && endDate.start.isSameOrAfter(dayjs(), 'day') ? endDate.start : undefined,
    });
  };

  return (
    <BaseDialog
      title="Ограничение записи"
      description="Настройте, как далеко клиенты могут записываться вперёд."
      confirmDisabled={mode === 'specific-date' && !Boolean(endDate)}
      onConfirm={handleConfirm}
    >
      <BookingLimitModeSelector
        value={mode}
        daysAhead={daysAhead}
        endDate={endDate}
        onChange={handleModeChange}
      />

      {mode !== 'unlimited' && <Separator />}

      {mode === 'days-ahead' && (
        <DaysAheadNumberPicker
          value={daysAhead}
          onChange={setDaysAhead}
        />
      )}

      {mode === 'specific-date' && (
        <EndDatePicker
          helperText="Клиенты смогут записываться только до выбранной даты."
          value={endDate}
          onChange={setEndDate}
          contentInsets={contentInsets}
        />
      )}

      {mode === 'unlimited' && (
        <Text variant='blockquote'>Ограничения не применяются</Text>
      )}
    </BaseDialog>
  );
};
