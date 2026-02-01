import { Dayjs } from "dayjs";

export interface PeriodsValue {
  startDate: Dayjs;
  endDate: Dayjs;
  template: string;
}

export interface WeeksValue {
  selectedDays: string[];
  endDate?: Dayjs;
  template: string;
}

export interface ShiftsValue {
  weekDays: { working: number; weekend: number };
  startDate: Dayjs;
  endDate: Dayjs;
  template: string;
}

export interface TemplateOption {
  label: string;
  value: string;
}
