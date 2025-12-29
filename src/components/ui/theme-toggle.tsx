import { AlertProps } from '@/components/ui/base-toast';
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MoonStarIcon, Smartphone, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { FC } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

type ColorScheme = "light" | "dark" | "system";

export const ThemeToggle: FC<{ className?: string }> = ({ className }) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const handleSchemeChange = (value?: string) => {
    if (value !== 'light' && value !== 'dark' && value !== 'system') return;

    const config: Record<ColorScheme, AlertProps> = {
      light: {
        title: 'Включили солнышко! ☀️',
        description: 'Яркость на максимум!',
      },
      dark: {
        title: 'Ночь, улица, фонарь... 🌙',
        description: 'Темный режим включен',
      },
      system: {
        title: 'Автопилот активирован! 🚀',
        description: 'Следуем настройкам системы',
      },
    };

    setColorScheme(value);
    Toast.show({
      type: 'success',
      props: config[value],
      bottomOffset: bottomTabBarHeight,
    });
  };

  return (
    <ToggleGroup size='default' value={colorScheme} onValueChange={handleSchemeChange} variant={Platform.select({ ios: 'default', default: 'outline' })} type='single' className={className} >
      <ToggleGroupItem isFirst value='system' aria-label='Toggle system' className={`rounded-l-${Platform.OS === 'ios' ? 'full' : 'md'}`}>
        <ToggleGroupIcon as={Smartphone} />
      </ToggleGroupItem>
      <ToggleGroupItem value='light' aria-label='Toggle light'>
        <ToggleGroupIcon as={SunIcon} />
      </ToggleGroupItem>
      <ToggleGroupItem isLast value='dark' aria-label='Toggle dark' className={`rounded-r-${Platform.OS === 'ios' ? 'full' : 'md'}`}>
        <ToggleGroupIcon as={MoonStarIcon} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}