import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Settings2 } from "lucide-react-native";
import { FC } from "react";
import { Platform } from "react-native";

interface SettingsHeaderActionProps {
  onPress?: () => void;
}

export const SettingsHeaderAction: FC<SettingsHeaderActionProps> = ({ onPress }) => {
  return (
    <Button
      onPress={onPress}
      variant={Platform.OS === 'ios' ? 'ghost' : 'outline'} 
      size='sm' 
      className='rounded-full'
    >
      <Icon as={Settings2} className='size-4' />
    </Button>
  );
}