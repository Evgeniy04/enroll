import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { DayCard } from '@/screens/Settings/Work/tabs/Schedule/components/WeekCalendar/DayCard';
import { WeekCalendarHeader } from '@/screens/Settings/Work/tabs/Schedule/components/WeekCalendar/WeekCalendarHeader';
import { Template } from '@/screens/Settings/Work/tabs/Templates/Templates.types';
import dayjs from 'dayjs';
import { FC, useState } from "react";

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
      <WeekCalendarHeader weekStart={currentWeekStart} onNextWeek={handleNextWeek} onPrevWeek={handlePrevWeek} onGoToToday={handleGoToToday} />
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