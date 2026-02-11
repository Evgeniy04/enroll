import { BaseFieldProps } from "@/components/ui/field";
import { toggleVariants } from "@/components/ui/toggle";
import type { VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react-native";

interface ToggleOption {
  label: string;
  value: string;
  icon?: LucideIcon;
  showText?: boolean;
  numberOfLines?: number;
}

interface TogglePreset {
  label: string;
  values: string[];
}

export interface ToggleGroupdFieldProps extends BaseFieldProps {
  options: ToggleOption[];
  variant?: VariantProps<typeof toggleVariants>["variant"];
  size?: VariantProps<typeof toggleVariants>["size"];
  orientation?: "horizontal" | "vertical";
  /** Максимум 3 пресета */
  presets?: TogglePreset[];
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}
