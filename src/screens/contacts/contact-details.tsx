import { KeyboardAvoidingScreen } from "@/components/layout/keyboard-avoiding-screen";
import { Stack, useLocalSearchParams } from "expo-router";

type ContactDetailsParams = {
  id: string;
  displayName: string;
};

export const ContactDetails = () => {
  const { id, displayName } = useLocalSearchParams<ContactDetailsParams>();
  
  return (
    <>
      <Stack.Screen options={{ title: displayName ?? 'Без имени' }} />
      <KeyboardAvoidingScreen>
        <></>
      </KeyboardAvoidingScreen>
    </>
  );
}