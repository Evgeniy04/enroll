export interface ScheduleSlot {
  id: string;
  serviceId: string;
  startTime: string;
  count: number;
}

export interface Template {
  id: string;
  name: string;
  slots: ScheduleSlot[];
}