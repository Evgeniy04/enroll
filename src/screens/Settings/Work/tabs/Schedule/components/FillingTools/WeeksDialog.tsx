import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Option } from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { FC } from "react";
import { View } from 'react-native';

export interface WeeksValue {
  
}

interface WeeksDialogProps {
  onConfirm: (value: WeeksValue) => void;
  templates: {
    label: string;
    value: string;
  }[];
}

export const WeeksDialog: FC<WeeksDialogProps> = ({
  onConfirm,
  templates,
}) => {
  const { width: screenWidth } = useWindowDimensions();

  const disabled = true;

  const handleConfirm = () => {

  };

  const handleTemplateChange = (value: Option | undefined) => {

  };

  return (
    <DialogContent style={{ width: screenWidth - 40, alignSelf: 'center' }}>
      <DialogHeader>
        <DialogTitle>Дни недели</DialogTitle>
        <DialogDescription>
          Повторяющиеся дни.
        </DialogDescription>
      </DialogHeader>

      <View className="gap-3">
        
      </View>

      <DialogFooter className="flex-row-reverse">
        <DialogClose asChild>
          <Button className="flex-1" variant="outline">
            <Text>Закрыть</Text>
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button className="flex-1" onPress={handleConfirm} disabled={disabled}>
            <Text>Применить</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};