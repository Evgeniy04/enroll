import { KeyboardAvoidingScreen } from "@/components/layout/keyboard-avoiding-screen";
import { ContactDetailsHeader } from "@/screens/contacts/components/contact-details-header";
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