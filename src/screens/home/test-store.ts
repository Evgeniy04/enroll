export const EVENTS = [
  {
    id: 1,
    title: "Евгений Аврамов",
    start: new Date(2025, 11, 10, 6, 30),
    end: new Date(2025, 11, 10, 8, 0),
    color: "#4caf50",
  },
  {
    id: 2,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 8, 0),
    end: new Date(2025, 11, 10, 9, 30),
    color: "#4caf50",
  },
  {
    id: 3,
    title: "Евгений Аврамов",
    start: new Date(2025, 11, 10, 9, 30),
    end: new Date(2025, 11, 10, 11, 0),
    color: "#4caf50",
  },
  {
    id: 4,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 11, 0),
    end: new Date(2025, 11, 10, 12, 30),
    color: "#4caf50",
  },
  {
    id: 5,
    title: "Евгений Аврамов",
    start: new Date(2025, 11, 10, 12, 30),
    end: new Date(2025, 11, 10, 14, 0),
    color: "#4caf50",
  },
  {
    id: 6,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 14, 0),
    end: new Date(2025, 11, 10, 15, 30),
    color: "#4caf50",
  },
  {
    id: 7,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 15, 30),
    end: new Date(2025, 11, 10, 17, 0),
    color: "#4caf50",
  },
  {
    id: 8,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 17, 0),
    end: new Date(2025, 11, 10, 18, 30),
    color: "#4caf50",
  },
  {
    id: 9,
    title: "Никита Белянин",
    start: new Date(2025, 11, 10, 18, 30),
    end: new Date(2025, 11, 10, 20, 0),
    color: "#4caf50",
  },
  {
    id: 10,
    title: "Никита Белянин",
    start: new Date(2025, 11, 9, 18, 30),
    end: new Date(2025, 11, 9, 20, 0),
    color: "#ff4d00ff",
  },
];

export interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
}
