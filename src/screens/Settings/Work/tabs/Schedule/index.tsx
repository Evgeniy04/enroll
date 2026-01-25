import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useConfirm } from '@/hooks/useConfirm';
import { useDialog } from '@/hooks/useDialog';
import { FormDialog as BookingLimitDialog, BookingLimitValue, OpenButton } from '@/screens/Settings/Work/tabs/Schedule/components/BookingLimit';
import { Actions, PeriodsDialog, PeriodsValue, ShiftsDialog, ShiftsValue, WeeksDialog, WeeksValue } from '@/screens/Settings/Work/tabs/Schedule/components/FillingTools';
import { WeekCalendar } from '@/screens/Settings/Work/tabs/Schedule/components/WeekCalendar';
import { templates } from '@/screens/test-store';
import { FC, useMemo, useState } from "react";
import { View } from 'react-native';

export const Schedule: FC = () => {
  const { confirm, ConfirmDialogElement } = useConfirm();
  const { openDialog, DialogElement } = useDialog();
  const [ bookingLimitValue, setBookingLimitValue ] = useState<BookingLimitValue>({
    mode: 'unlimited',
    daysAhead: 30,
  });
  const [ periodValue, setPeriodValue ] = useState<PeriodsValue>();
  const [ weeksValue, setWeeksValue ] = useState<WeeksValue>();
  const [ shiftsValue, setShiftsValue ] = useState<ShiftsValue>();
  const templateOptions = useMemo(() => templates.map(({ name, id }) => ({ label: name, value: id })), [])

  const handleOpenBookingLimitDialog = () => {
    openDialog(BookingLimitDialog, {
      onConfirm: setBookingLimitValue,
      initialData: bookingLimitValue,
    });
  };

  const handleOpenPeriodsDialog = () => {
    openDialog(PeriodsDialog, {
      onConfirm: setPeriodValue,
      templates: templateOptions
    });
  };

  const handleOpenShiftsDialog = () => {
    openDialog(ShiftsDialog, {
      onConfirm: setShiftsValue,
      templates: templateOptions,
    });
  };

  const handleOpenWeeksDialog = () => {
    openDialog(WeeksDialog, {
      onConfirm: setWeeksValue,
      templates: templateOptions,
    });
  };

  const handleReset = () => {
    confirm({
      title: 'Сбросить график?',
      description: 'Все дни в расписании будут помечены как выходные. Рабочие дни и доступные слоты будут полностью удалены.',
      confirmText: 'Сбросить',
      cancelText: 'Отмена',
      onConfirm: () => {},
    });
  };

  return (
    <>
      <View className='gap-6'>
        <Card className='bg-accent'>
          <CardHeader>
            <CardTitle>График работы</CardTitle>
            <CardDescription>
              Примените созданные шаблоны дня к рабочим датам. 
            </CardDescription>
          </CardHeader>
        </Card>
        <View className="gap-3">
          <OpenButton
            onPress={handleOpenBookingLimitDialog}
            value={bookingLimitValue}
          />
          <Separator />
          <Actions
            onPeriods={handleOpenPeriodsDialog}
            onShifts={handleOpenShiftsDialog}
            onWeeks={handleOpenWeeksDialog}
            onReset={handleReset}
          />
          <Separator />
          <WeekCalendar templates={templates} />
        </View>
      </View>
      
      {DialogElement}
      {ConfirmDialogElement}
    </>
  );
};