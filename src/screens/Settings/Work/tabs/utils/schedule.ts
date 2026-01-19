import { TimeProps } from '@/components/ui/time-picker-field/time-picker-field.types';
import { Service } from '../Services/Services.types';
import { ScheduleSlot } from '../Templates/Templates.types';

export const calculateEndTime = (slot: ScheduleSlot, service: Service | null): TimeProps => {
  if (!service) return slot.startTime;

  const { hours = 9, minutes = 0 } = slot.startTime;
  const totalMinutes = (service.duration + service.breakAfter) * slot.count;

  const end = hours * 60 + minutes + totalMinutes;
  return { hours: Math.floor(end / 60), minutes: end % 60 };
};

export const calculateTotalDuration = (
  slots: ScheduleSlot[],
  services: Service[],
): number => {
  return slots?.reduce((total, slot) => {
    const service = services.find(s => s.id === slot.serviceId);
    if (!service) return total;

    const slotDuration = service.duration + service.breakAfter;
    return total + slotDuration * slot.count;
  }, 0);
};