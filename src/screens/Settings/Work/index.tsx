import { KeyboardAvoidingScreen } from '@/components/layout/KeyboardAvoidingScreen';
import { Stack } from 'expo-router';

export const Work = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Параметры работы",
        }}
      />
      <KeyboardAvoidingScreen>
        <></>
      </KeyboardAvoidingScreen>
    </>
  );
}