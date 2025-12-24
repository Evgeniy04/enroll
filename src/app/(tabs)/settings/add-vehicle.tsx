import { useTabsHeader } from '@/hooks/useTabsHeader';
import { Settings } from '@/screens/settings';

export default function AddVehicleScreen() {
  useTabsHeader('Ваш транспорт', true);

  return <Settings />
}
