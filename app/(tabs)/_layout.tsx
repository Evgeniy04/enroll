import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs screenOptions={{
        sceneStyle: {
          backgroundColor: colors.card,
        },
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
