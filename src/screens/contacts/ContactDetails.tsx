import { KeyboardAvoidingScreen } from "@/components/layout/keyboard-avoiding-screen";
import { useTabsHeader } from "@/hooks/useTabsHeader";

export const ContactDetails = () => {
  useTabsHeader('Евгений Владимирович Аврамов', true);

  return (
    <KeyboardAvoidingScreen>
      <></>
    </KeyboardAvoidingScreen>
  );
}