import type { LucideIcon } from "lucide-react-native";

export interface Field {
  id: string;
  label: string;
  value: string;
}

export interface Section {
  id: string;
  title: string;
  icon: LucideIcon;
  fields: Field[];
  photoUri?: string;
}
