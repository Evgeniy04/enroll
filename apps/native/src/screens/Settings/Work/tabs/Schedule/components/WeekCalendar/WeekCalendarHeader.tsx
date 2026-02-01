import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import dayjs, { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react-native";
import React, { FC } from "react";
import { View } from "react-native";

interface WeekCalendarHeaderProps {
  weekStart: Dayjs;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onGoToToday: () => void;
  className?: string;
}

export const WeekCalendarHeader: FC<WeekCalendarHeaderProps> = ({
  weekStart,
  onPrevWeek,
  onNextWeek,
  onGoToToday,
  className,
}) => {
  const weekEnd = weekStart.add(6, "day");

  const showGoToCurrentWeekButton = !dayjs().isBetween(
    weekStart,
    weekEnd,
    null,
    "[]",
  );

  const formatWeekRange = (start: Dayjs, end: Dayjs) => {
    const startStr = start.format("D MMM");
    const endStr = end.format("D MMM");
    return `${startStr} - ${endStr}`;
  };

  return (
    <CardContent className={cn("gap-2 p-2", className)}>
      <View className="flex-row items-center justify-between">
        <Button size="icon" variant="outline" onPress={onPrevWeek}>
          <Icon as={ChevronLeft} />
        </Button>

        <View className="justify-center">
          <Text variant="small" className="text-center text-muted-foreground">
            {weekStart.year()}
          </Text>
          <Text variant="lead" className="text-primary">
            {formatWeekRange(weekStart, weekEnd)}
          </Text>
        </View>

        <View className="flex-row">
          {showGoToCurrentWeekButton && (
            <Button
              size="icon"
              variant="outline"
              className="rounded-r-none border-r-0"
              onPress={onGoToToday}
            >
              <Icon as={RotateCcw} />
            </Button>
          )}
          <Button
            size="icon"
            variant="outline"
            className={cn(
              showGoToCurrentWeekButton
                ? "rounded-l-none border-l-0"
                : "rounded-l-md border-l border-l-border",
            )}
            onPress={onNextWeek}
          >
            <Icon as={ChevronRight} />
          </Button>
        </View>
      </View>
    </CardContent>
  );
};
