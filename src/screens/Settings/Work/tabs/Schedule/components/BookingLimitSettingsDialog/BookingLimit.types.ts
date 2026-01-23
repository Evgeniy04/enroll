import { Dayjs } from 'dayjs';

export type BookingLimitMode = 'days-ahead' | 'specific-date' | 'unlimited';

export interface BookingLimitValue {
  mode: BookingLimitMode;
  daysAhead: number;
  endDate?: Dayjs;
}