import { KeyboardAvoidingScreen } from "@/components/layout/keyboard-avoiding-screen";
import { useTabsHeader } from "@/hooks/useTabsHeader";
import { useLocalSearchParams } from "expo-router";
import { CONTACTS } from "./test-store";

type ContactDetailsParams = {
  id: string;
};

export const ContactDetails = () => {
  const { id } = useLocalSearchParams<ContactDetailsParams>();
  
  useTabsHeader(CONTACTS[Number(id) - 1].name, true);

  return (
    <KeyboardAvoidingScreen>
      <></>
    </KeyboardAvoidingScreen>
  );
}