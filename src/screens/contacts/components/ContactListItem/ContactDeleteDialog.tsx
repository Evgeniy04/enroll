import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Text } from '@/components/ui/text';
import { FC } from 'react';
import { Dimensions } from 'react-native';

interface ContactDeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ContactDeleteDialog: FC<ContactDeleteDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent
        style={{ width: screenWidth - 40, alignSelf: 'center' }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить контакт?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Отменить</Text>
          </AlertDialogCancel>
          <AlertDialogAction onPress={onConfirm}>
            <Text>Удалить</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};