import { CalendarHeaderProps, CalendarViewMode } from '@/components/ui/event-calendar/event-calendar.types';
import dayjs from 'dayjs';
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const DefaultCalendarHeader: FC<CalendarHeaderProps> = ({
  currentDate,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <Text className="text-lg font-semibold text-gray-900 dark:text-white">
        {dayjs(currentDate).format('MMMM YYYY')}
      </Text>
      
      <View className="flex-row gap-2">
        {(['day', '3days', 'week', 'month'] as CalendarViewMode[]).map((mode) => (
          <TouchableOpacity
            key={mode}
            onPress={() => onViewModeChange(mode)}
            className={`px-3 py-1.5 rounded ${
              viewMode === mode
                ? 'bg-blue-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <Text
              className={`text-xs font-medium ${
                viewMode === mode
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {mode === '3days' ? '3Д' : mode === 'day' ? 'День' : mode === 'week' ? 'Неделя' : 'Месяц'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};