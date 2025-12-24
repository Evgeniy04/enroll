import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export function useRestoreTabsHeader(title: string) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const tabsNav = navigation.getParent();
      if (tabsNav) {
        tabsNav.setOptions({
          headerTitle: title,
          headerLeft: undefined,
        });
      }
    }, [navigation, title])
  );
}
