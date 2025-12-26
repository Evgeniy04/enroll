import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useEffect } from 'react';

export const useTabsHeader = (title: string, showBackButton = false) => {
  const navigation = useNavigation();

  useEffect(() => {
    const tabsNav = navigation.getParent();
    if (!tabsNav) return;

    tabsNav.setOptions({
      headerTitle: title,
      headerLeft: showBackButton
        ? () => (
            <Button variant="ghost" size="icon" className='rounded-full' onPress={() => navigation.goBack()}>
              <Icon as={ArrowLeft} className="w-5 h-5" />
            </Button>
          )
        : undefined,
    });
  }, [navigation, title, showBackButton]);
}
