import { useRestoreTabsHeader } from '@/hooks/useRestoreTabsHeader';
import { Contacts } from '@/screens/contacts';

export default function ContactsScreen() {
  useRestoreTabsHeader('Контакты');

  return <Contacts />
}
