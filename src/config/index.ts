import { initializeLocales } from '@/config/locales';

/**
 * Инициализация всех конфигураций приложения
 * Вызывается один раз при старте
 */
export const initializeApp = () => {
  initializeLocales();
};

export * from '@/config/locales';
export * from '@/config/themes';
export * from '@/config/toast';
