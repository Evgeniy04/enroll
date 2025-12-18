import { configureCalendarLocale } from "@/config/locales/calendar.locale";

/**
 * Инициализация всех локализаций приложения
 * Должна вызываться один раз при старте приложения
 */
export const initializeLocales = () => {
  configureCalendarLocale();
};

export { configureCalendarLocale } from '@/config/locales/calendar.locale';
