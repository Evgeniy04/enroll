import { TimeProps } from "@/components/ui/time-picker-field/time-picker-field.types";

export interface ScheduleSlot {
  id: string;
  serviceId: string;
  startTime: TimeProps;
  count: number;
}

export interface Template {
  id: string;
  name: string;
  slots: ScheduleSlot[];
}
