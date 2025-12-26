import { ThemeToggle } from '@/components/ui/theme-toggle';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

const TabLayout = () => {
  const { colors } = useTheme();

  return (
    <Tabs screenOptions={{
        headerRight: () => <ThemeToggle className={`${Platform.select({android: 'mr-2'})}`} />,
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

export default TabLayout;
