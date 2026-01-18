import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { Plus } from 'lucide-react-native';
import { FC } from 'react';

export interface FormDialogProps<FormData> {
  FormComponent: FC<{ onSubmit: (data: FormData) => void; initialData: FormData | null }>;
  onCreate: (item: FormData) => void;
  editingItem: FormData | null;
  onUpdate: (item: FormData) => void;
  isControlled?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FormDialog = <FormData,>({
  FormComponent,
  onCreate,
  editingItem,
  onUpdate,
  isControlled,
  open,
  onOpenChange,
}: FormDialogProps<FormData>) => {
  const { width: screenWidth } = useWindowDimensions();

  const handleSubmitPress = (data: FormData) => {
    if (editingItem && onUpdate) {
      onUpdate(data);
    } else {
      onCreate(data);
    }
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button size="icon">
            <Icon as={Plus} className="text-primary-foreground" />
          </Button>
        </DialogTrigger>
      )}

      <DialogContent style={{ width: screenWidth - 40, alignSelf: 'center' }}>
        <FormComponent onSubmit={handleSubmitPress} initialData={editingItem} />
      </DialogContent>
    </Dialog>
  );
};