import { useTabsHeader } from '@/hooks/useTabsHeader';
import { AddVehicle } from '@/screens/settings/add-vehicle';

export default function AddVehicleScreen() {
  useTabsHeader('Ваш транспорт', true);

  return <AddVehicle />
}
