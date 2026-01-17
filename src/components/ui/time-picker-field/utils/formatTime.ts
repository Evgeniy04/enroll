export interface TimeProps {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export const formatTime = ({
  days,
  hours = 0,
  minutes = 0,
  seconds,
}: TimeProps) => {
    const timeParts = [];

    if (days !== undefined && days !== 0) {
        timeParts.push(days.toString().padStart(2, "0") + ' д');
    }
    timeParts.push(hours.toString().padStart(2, "0") + ' ч');
    timeParts.push(minutes.toString().padStart(2, "0")  + ' м');
    if (seconds !== undefined && seconds !== 0) {
        timeParts.push(seconds.toString().padStart(2, "0") + ' с');
    }

    return timeParts.join(" : ");
};