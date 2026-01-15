import { Stack } from 'expo-router';

const SettingsStack = () => {
  return (
    <Stack>
      <Stack.Screen name="Profile" />
    </Stack>
  );
}

export default SettingsStack;