import { AlertProps } from "@/components/ui/base-toast";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { MoonStarIcon, Smartphone, SunIcon } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { FC } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

type ColorScheme = "light" | "dark" | "system";

const THEME_TOAST_CONFIG: Record<ColorScheme, AlertProps> = {
  light: {
    title: "Включили солнышко! ☀️",
    description: "Яркость на максимум!",
  },
  dark: {
    title: "Ночь, улица, фонарь... 🌙",
    description: "Тёмный режим включён",
  },
  system: {
    title: "Автопилот активирован! 🚀",
    description: "Следуем настройкам системы",
  },
};

interface ThemeToggleProps {
  enableIosSpecials?: boolean;
  className?: string;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({
  enableIosSpecials,
  className,
}) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const handleSchemeChange = (nextScheme?: string) => {
    if (
      nextScheme !== "light" &&
      nextScheme !== "dark" &&
      nextScheme !== "system"
    ) {
      return;
    }

    setColorScheme(nextScheme);

    Toast.show({
      type: "success",
      props: THEME_TOAST_CONFIG[nextScheme],
      bottomOffset: bottomTabBarHeight,
    });
  };

  const isIos = enableIosSpecials && Platform.OS === "ios";

  return (
    <ToggleGroup
      type="single"
      size="sm"
      value={colorScheme}
      onValueChange={handleSchemeChange}
      variant={isIos ? "default" : "outline"}
      className={className}
    >
      <ToggleGroupItem
        isFirst
        value="system"
        aria-label="System theme"
        className={isIos ? "rounded-l-full" : "rounded-l-md"}
      >
        <ToggleGroupIcon as={Smartphone} />
      </ToggleGroupItem>

      <ToggleGroupItem value="light" aria-label="Light theme">
        <ToggleGroupIcon as={SunIcon} />
      </ToggleGroupItem>

      <ToggleGroupItem
        isLast
        value="dark"
        aria-label="Dark theme"
        className={isIos ? "rounded-r-full" : "rounded-r-md"}
      >
        <ToggleGroupIcon as={MoonStarIcon} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
