import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';

export type ContentInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export const useContentInsets = (): ContentInsets => {
  const headerHeight = useHeaderHeight();
  const bottomTabBarHeight = useBottomTabBarHeight();

  return {
    top: headerHeight,
    bottom: bottomTabBarHeight,
    left: 20,
    right: 20,
  };
};