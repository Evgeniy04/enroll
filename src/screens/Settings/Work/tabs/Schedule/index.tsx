import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useConfirm } from '@/hooks/useConfirm';
import { BookingLimitSettingsButton } from '@/screens/Settings/Work/tabs/Schedule/components/BookingLimitSettingsButton';
import { FillTools } from '@/screens/Settings/Work/tabs/Schedule/components/FillTools';
import { WeekCalendar } from '@/screens/Settings/Work/tabs/Schedule/components/WeekCalendar';
import { templates } from '@/screens/test-store';
import { FC } from "react";
import { View } from 'react-native';

export const Schedule: FC = () => {
  const { confirm, ConfirmDialogElement } = useConfirm();

  const handlePeriods = () => {
  };

  const handleShifts = () => {
  };

  const handleWeeks = () => {
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
          <BookingLimitSettingsButton />
          <Separator />
          <FillTools
            onPeriods={handlePeriods}
            onShifts={handleShifts}
            onWeeks={handleWeeks}
            onReset={handleReset}
          />
          <Separator />
          <WeekCalendar templates={templates} />
        </View>
      </View>

      {ConfirmDialogElement}
    </>
  );
};