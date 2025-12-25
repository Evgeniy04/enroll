import { useTabsHeader } from '@/hooks/useTabsHeader';
import { Profile } from '@/screens/contacts/profile';

export default function ProfileScreen() {
  useTabsHeader('Евгений Владимирович Аврамов', true);

  return <Profile />
}
