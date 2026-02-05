import { Icon } from "@/components/ui/icon";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { LucideIcon, LucideProps } from "lucide-react-native";
import { FC } from "react";
import { ViewStyle } from "react-native";
import colors from "tailwindcss/colors";

interface GradientIconProps {
  icon: LucideIcon;
  size?: number;
  sizeIcon?: number;
  colors: LinearGradientProps["colors"];
  style?: ViewStyle;
  gradientProps?: Omit<LinearGradientProps, "colors" | "style" | "children">;
  iconProps?: Omit<LucideProps, "as" | "size" | "className">;
}

export const GradientIcon: FC<GradientIconProps> = ({
  icon,
  size = 36,
  sizeIcon,
  colors,
  style,
  gradientProps,
  iconProps,
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: size,
        height: size,
        borderRadius: size / 4,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      {...gradientProps}
    >
      <Icon
        as={icon}
        size={sizeIcon ?? size * 0.75}
        className="text-primary-foreground"
        {...iconProps}
      />
    </LinearGradient>
  );
};

const DEFAULT_GRADIENT_COLORS: Partial<
  Record<keyof typeof colors, LinearGradientProps["colors"]>
> = {
  blue: [colors.blue[500], colors.cyan[500]],
  purple: [colors.purple[500], colors.pink[500]],
  emerald: [colors.emerald[600], colors.emerald[300]],
  orange: [colors.orange[600], colors.orange[300]],
};

export type GradientColor = keyof typeof DEFAULT_GRADIENT_COLORS;

export const getGradientColors = (
  color: keyof typeof colors,
): readonly [string, string] => {
  const gradient = DEFAULT_GRADIENT_COLORS[color];
  if (gradient) return gradient as readonly [string, string];
  return ["#000000", "#111111"];
};
