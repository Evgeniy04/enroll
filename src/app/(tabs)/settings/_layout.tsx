import { Stack } from 'expo-router';

const SettingsStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="index" />
      <Stack.Screen name="add-vehicle" />
    </Stack>
  );
}

export default SettingsStack;