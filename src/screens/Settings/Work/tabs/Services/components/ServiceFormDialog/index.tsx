import { FormDialog } from '@/screens/Settings/Work/tabs/components/FormDialog';
import { ServiceForm } from '@/screens/Settings/Work/tabs/Services/components/ServiceFormDialog/ServiceForm';
import { FC } from 'react';
import { Service } from '../../Services.types';

interface ServiceFormDialogProps {
  onCreate: (service: Service) => void;
  onUpdate: (service: Service) => void;
  editingService?: Service | null;
  isControlled?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ServiceFormDialog: FC<ServiceFormDialogProps> = ({
  onCreate,
  onUpdate,
  editingService = null,
  isControlled,
  open,
  onOpenChange,
}) => {
  return (
    <FormDialog<Service>
      FormComponent={ServiceForm}
      onCreate={onCreate}
      onUpdate={onUpdate}
      editingItem={editingService}
      isControlled={isControlled}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
};
