import { Button } from '@/components/ui/button';
import { DatePickerValue } from '@/components/ui/date-picker';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';
import { useContentInsets } from '@/hooks/useContentInsets';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { BookingLimitValue } from '@/screens/Settings/Work/tabs/Schedule/components/BookingLimitSettingsDialog/BookingLimit.types';
import { DaysAheadFields } from '@/screens/Settings/Work/tabs/Schedule/components/BookingLimitSettingsDialog/DaysAheadFields';
import { ModeSelector } from '@/screens/Settings/Work/tabs/Schedule/components/BookingLimitSettingsDialog/ModeSelector';
import { SpecificDateFields } from '@/screens/Settings/Work/tabs/Schedule/components/BookingLimitSettingsDialog/SpecificDateFields';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { View } from 'react-native';

interface BookingLimitSettingsDialogProps {
  onConfirm: (value: BookingLimitValue) => void;
  initialData: BookingLimitValue;
}

export const BookingLimitSettingsDialog: FC<BookingLimitSettingsDialogProps> = ({
  onConfirm,
  initialData
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const contentInsets = useContentInsets();
  const [ mode, setMode ] = useState<string | undefined>(initialData.mode);
  const [ daysAhead, setDaysAhead ] = useState(initialData.daysAhead);
  const [ endDate, setEndDate ] = useState<DatePickerValue | undefined>(
    initialData.endDate && { start: initialData.endDate }
  );

  const handleChangeMode = (value?: string) => {
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
    <DialogContent style={{ width: screenWidth - 40, alignSelf: 'center' }}>
      <DialogHeader>
        <DialogTitle>Ограничение записи</DialogTitle>
        <DialogDescription>
          Настройте, как далеко клиенты могут записываться вперёд.
        </DialogDescription>
      </DialogHeader>

      <View className="gap-3">
        <ModeSelector
          value={mode ?? 'unlimited'}
          daysAhead={daysAhead}
          endDate={endDate}
          onChange={handleChangeMode}
        />

        {mode !== 'unlimited' && <Separator />}

        {mode === 'days-ahead' && (
          <DaysAheadFields
            value={daysAhead}
            onChange={setDaysAhead}
          />
        )}

        {mode === 'specific-date' && (
          <SpecificDateFields
            value={endDate}
            onChange={setEndDate}
            contentInsets={contentInsets}
          />
        )}

        {mode === 'unlimited' && (
          <Text variant='blockquote'>Ограничения не применяются</Text>
        )}
      </View>

      <DialogFooter className="flex-row-reverse">
        <DialogClose asChild>
          <Button className="flex-1" variant="outline">
            <Text>Закрыть</Text>
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button className="flex-1" onPress={handleConfirm} disabled={mode === 'specific-date' && !Boolean(endDate)}>
            <Text>Применить</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
