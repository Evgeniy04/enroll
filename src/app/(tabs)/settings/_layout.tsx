import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Stack } from 'expo-router';

export default function ProfileStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Настройки' }} />
      <Stack.Screen name="add-vehicle" options={{ title: 'Ваш транспорт' }} />
    </Stack>
  );
}
