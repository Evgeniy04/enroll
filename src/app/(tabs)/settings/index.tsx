import { useRestoreTabsHeader } from '@/hooks/useRestoreTabsHeader';
import { Settings } from '@/screens/settings';

export default function SettingsScreen() {
  useRestoreTabsHeader('Настройки');

  return <Settings />
}
