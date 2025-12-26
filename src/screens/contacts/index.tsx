import { KeyboardAvoidingScreen } from '@/components/layout/keyboard-avoiding-screen';
import { useRestoreTabsHeader } from '@/hooks/useRestoreTabsHeader';

export const Contacts = () => {
  useRestoreTabsHeader('Контакты');

  return (
    <KeyboardAvoidingScreen>
      <></>
    </KeyboardAvoidingScreen>
  );
}