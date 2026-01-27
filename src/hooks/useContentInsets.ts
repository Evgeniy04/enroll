import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useHeaderHeight } from "@react-navigation/elements";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ContentInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export const useContentInsets = (): ContentInsets => {
  const { top: topSafeAreaInsets } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return {
    top: Platform.select({
      android: topSafeAreaInsets + headerHeight,
      default: headerHeight,
    }),
    bottom: bottomTabBarHeight,
    left: 20,
    right: 20,
  };
};
