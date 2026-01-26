import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Text } from '@/components/ui/text';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { FC, ReactNode } from 'react';
import { View } from 'react-native';

interface BaseDialogProps {
  title: string;
  description?: string;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  children: ReactNode;
}

export const BaseDialog: FC<BaseDialogProps> = ({
  title,
  description,
  confirmDisabled,
  onConfirm,
  children,
}) => {
  const { width } = useWindowDimensions();

  return (
    <DialogContent style={{ width: width - 40, alignSelf: 'center' }}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      <View className="gap-3">{children}</View>

      <DialogFooter className="flex-row-reverse">
        <DialogClose asChild>
          <Button className="flex-1" variant="outline">
            <Text>Закрыть</Text>
          </Button>
        </DialogClose>

        <DialogClose asChild>
          <Button
            className="flex-1"
            onPress={onConfirm}
            disabled={confirmDisabled}
          >
            <Text>Применить</Text>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
