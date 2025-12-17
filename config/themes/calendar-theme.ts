import { THEME } from '@/lib/theme';
import type { CalendarProps } from 'react-native-calendars';

/**
 * Генерирует конфигурацию темы для react-native-calendars
 * на основе текущей цветовой схемы
 */
export const getCalendarTheme = (
  mode: 'light' | 'dark'
): CalendarProps['theme'] => {
  const t = THEME[mode];

  return {
    /* Фоны */
    backgroundColor: t.background,
    calendarBackground: t.background,

    /* Заголовок месяца */
    monthTextColor: t.foreground,
    textMonthFontSize: 16,
    textMonthFontWeight: '600',

    /* Названия дней недели */
    textSectionTitleColor: t.mutedForeground,
    textSectionTitleDisabledColor: t.muted,

    /* Дни */
    dayTextColor: t.foreground,
    textDisabledColor: t.mutedForeground,
    textInactiveColor: t.mutedForeground,

    /* Сегодня */
    todayTextColor: t.primary,
    todayBackgroundColor: t.accent,

    /* Выбранный день */
    selectedDayBackgroundColor: t.primary,
    selectedDayTextColor: t.primaryForeground,

    /* Точки (маркеры событий) */
    dotColor: t.primary,
    selectedDotColor: t.primaryForeground,
    disabledDotColor: t.mutedForeground,
    inactiveDotColor: t.mutedForeground,

    /* Стрелки навигации */
    arrowColor: t.foreground,
    disabledArrowColor: t.mutedForeground,

    /* Прочее */
    indicatorColor: t.primary,
  };
};

export const CALENDAR_CONSTANTS = {
  FIRST_DAY: 1, // День начинается с понедельника
} as const;