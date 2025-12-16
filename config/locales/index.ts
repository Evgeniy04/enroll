import { configureCalendarLocale } from "./calendar.locale";

/**
 * Инициализация всех локализаций приложения
 * Должна вызываться один раз при старте приложения
 */
export const initializeLocales = () => {
  configureCalendarLocale();
};

export { configureCalendarLocale } from './calendar.locale';
