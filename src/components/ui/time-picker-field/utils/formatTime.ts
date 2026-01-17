export interface TimeProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const formatTime = ({
  hours,
  minutes,
  seconds,
}: TimeProps) => {
    const timeParts = [];

    if (hours !== undefined) {
        timeParts.push(hours.toString().padStart(2, "0"));
    }
    if (minutes !== undefined) {
        timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
        timeParts.push(seconds.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
};