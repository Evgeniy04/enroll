import { KeyboardAvoidingScreen } from "@/components/layout/KeyboardAvoidingScreen";
import { ContactDetailsHeader } from "@/screens/ContactDetails/components/ContactDetailsHeader";
import { Stack, useLocalSearchParams } from "expo-router";

type ContactDetailsParams = {
  id: string;
  displayName: string;
};

export const ContactDetails = () => {
  const { id, displayName } = useLocalSearchParams<ContactDetailsParams>();
  
  return (
    <>
      <Stack.Screen options={{ title: 'Запись' }} />
      <KeyboardAvoidingScreen>
        <ContactDetailsHeader id={id} />
      </KeyboardAvoidingScreen>
    </>
  );
}