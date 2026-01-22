import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CalendarHeader } from '@/screens/Settings/Work/tabs/Schedule/components/WeekCalendar/CalendarHeader';
import { DayCard } from '@/screens/Settings/Work/tabs/Schedule/components/WeekCalendar/DayCard';
import { Template } from '@/screens/Settings/Work/tabs/Templates/Templates.types';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useState } from "react";

export interface DaySchedule {
  date: Dayjs;
  templateId: string | null;
}

export type BookingLimitType = 'days_ahead' | 'specific_date' | 'unlimited';

export interface BookingSettings {
  limitType: BookingLimitType;
  daysAhead?: number;
  specificDate?: string;
}

interface WeekCalendarProps {
  templates: Template[];
  className?: string;
}

export const WeekCalendar: FC<WeekCalendarProps> = ({
  templates,
  className
}) => {
  const [ currentWeekStart, setCurrentWeekStart ] = useState(dayjs().weekday(0));

  const handlePrevWeek = () => {
    setCurrentWeekStart(prev => prev.add(-7, 'day'));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(prev => prev.add(7, 'day'));
  };

  const handleGoToToday = () => {
    setCurrentWeekStart(dayjs().weekday(0));
  }

  return (
    <Card className={cn('p-0 gap-0 overflow-hidden shadow-lg dark:shadow-primary bg-neutral-100 dark:bg-neutral-950', className)}>
      <CalendarHeader weekStart={currentWeekStart} onNextWeek={handleNextWeek} onPrevWeek={handlePrevWeek} onGoToToday={handleGoToToday} />
      <Separator className='bg-primary/10' />
      <CardContent className="p-2 gap-3">
        {Array.from({ length: 7 }, (_, n) => (
          <DayCard
            key={n}
            templates={templates.map(({ name, id }) => ({ label: name, value: id }))}
            date={currentWeekStart.weekday(n)}
          />
        ))}
      </CardContent>
    </Card>
  );
};