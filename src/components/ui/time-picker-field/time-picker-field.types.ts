export interface TimeProps {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

export interface FormatTimeOptions {
  /**
   * Какие единицы показывать и в каком порядке
   */
  units?: TimeUnit[];
  /**
   * Подписи единиц
   */
  labels?: Partial<Record<TimeUnit, string>>;
  /**
   * Разделитель между частями времени
   */
  separator?: string;
  /**
   * Разделитель между числом и единицей 
   */
  unitSeparator?: string;
  /**
   * Минимальная длина числа
   */
  padLength?: number;
  /**
   * Показывать ли нулевые значения
   */
  showZero?: boolean;
}