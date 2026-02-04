import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DayCard } from "@/screens/settings/Work/tabs/Schedule/components/WeekCalendar/DayCard";
import { WeekCalendarHeader } from "@/screens/settings/Work/tabs/Schedule/components/WeekCalendar/WeekCalendarHeader";
import { Template } from "@/screens/settings/Work/tabs/Templates/Templates.types";
import dayjs from "dayjs";
import { FC, useState } from "react";

interface WeekCalendarProps {
  templates: Template[];
  className?: string;
}

export const WeekCalendar: FC<WeekCalendarProps> = ({
  templates,
  className,
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().weekday(0));

  const handlePrevWeek = () => {
    setCurrentWeekStart((prev) => prev.add(-7, "day"));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => prev.add(7, "day"));
  };

  const handleGoToToday = () => {
    setCurrentWeekStart(dayjs().weekday(0));
  };

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden bg-neutral-100 p-0 shadow-lg dark:bg-neutral-950 dark:shadow-primary",
        className,
      )}
    >
      <WeekCalendarHeader
        weekStart={currentWeekStart}
        onNextWeek={handleNextWeek}
        onPrevWeek={handlePrevWeek}
        onGoToToday={handleGoToToday}
      />
      <Separator className="bg-primary/10" />
      <CardContent className="gap-3 p-2">
        {Array.from({ length: 7 }, (_, n) => (
          <DayCard
            key={n}
            templates={templates.map(({ name, id }) => ({
              label: name,
              value: id,
            }))}
            date={currentWeekStart.weekday(n)}
          />
        ))}
      </CardContent>
    </Card>
  );
};
