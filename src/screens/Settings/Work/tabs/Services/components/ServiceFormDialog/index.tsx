import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import {
  ServiceForm
} from '@/screens/Settings/Work/tabs/Services/components/ServiceFormDialog/ServiceForm';
import { Service } from '@/screens/Settings/Work/tabs/Services/Services.types';
import { Plus } from 'lucide-react-native';
import React, { FC } from 'react';

interface ServiceFormDialogProps {
  onAddPress: (service: Service) => void;
  editingService: Service | null;
  onUpdatePress: (service: Service) => void;
  isControlled?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ServiceFormDialog: FC<ServiceFormDialogProps> = ({
  onAddPress,
  editingService,
  onUpdatePress,
  isControlled,
  open,
  onOpenChange,
}) => {
  const { width: screenWidth } = useWindowDimensions();

  const handleSubmit = (service: Omit<Service, 'id'>) => {
    if (editingService && onUpdatePress) {
      onUpdatePress({
        ...service,
        id: editingService.id,
      });
    } else {
      onAddPress({
        ...service,
        id: '',
      });
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
        <ServiceForm onSubmit={handleSubmit} initialData={editingService} />
      </DialogContent>
    </Dialog>
  );
};