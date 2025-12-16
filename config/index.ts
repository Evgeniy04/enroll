import { initializeLocales } from './locales';

/**
 * Инициализация всех конфигураций приложения
 * Вызывается один раз при старте
 */
export const initializeApp = () => {
  initializeLocales();
};

export * from './locales';
