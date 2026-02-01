import { ComponentType } from "react";
import { EventRenderer } from "react-native-big-calendar";
export type CalendarViewMode = "day" | "3days" | "week";

export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
  color?: string;
  [key: string]: any;
}

export interface EventCalendarProps {
  sceneHeight: number;
  events: CalendarEvent[];
  initialDate?: Date;
  initialViewMode?: CalendarViewMode;
  onPressEvent?: (event: CalendarEvent) => void;
  renderEvent?: EventRenderer;
  eventCellStyle?: (event: CalendarEvent) => object;
  HeaderComponent?: ComponentType<CalendarHeaderProps> | null;
  onDateChange?: (date: Date) => void;
  onViewModeChange?: (mode: CalendarViewMode) => void;
  viewMode?: CalendarViewMode;
  currentDate?: Date;
  showVerticalScrollIndicator?: boolean;
  className?: string;
}

export interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: CalendarViewMode;
  onViewModeChange: (mode: CalendarViewMode) => void;
}
