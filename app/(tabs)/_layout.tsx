import { AlertProps } from '@/components/ui/base-toast';
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '@/components/ui/toggle-group';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { MoonStarIcon, Smartphone, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs screenOptions={{
        headerRight: () => <ThemeToggle />,
        sceneStyle: {
          backgroundColor: colors.card,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Контакты',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}

type ColorScheme = "light" | "dark" | "system";

function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const bottomOffset = useBottomTabBarHeight();

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
      bottomOffset,
    });
  };

  return (
    <ToggleGroup value={colorScheme} onValueChange={handleSchemeChange} variant='outline' type='single' className={`${Platform.select({android: 'mr-2'})}`} >
      <ToggleGroupItem isFirst value='system' aria-label='Toggle system'>
        <ToggleGroupIcon as={Smartphone} />
      </ToggleGroupItem>
      <ToggleGroupItem value='light' aria-label='Toggle light'>
        <ToggleGroupIcon as={SunIcon} />
      </ToggleGroupItem>
      <ToggleGroupItem isLast value='dark' aria-label='Toggle dark'>
        <ToggleGroupIcon as={MoonStarIcon} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}