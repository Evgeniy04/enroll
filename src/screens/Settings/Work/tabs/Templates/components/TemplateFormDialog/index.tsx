import { FC } from 'react';
import { FormDialog } from '../../../components/FormDialog';
import { Template } from '../../Templates.types';
import { TemplateForm } from './TemplateForm';

interface TemplateFormDialogProps {
  onCreate: (template: Template) => void;
  onUpdate: (template: Template) => void;
  editingTemplate?: Template | null;
  isControlled?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TemplateFormDialog: FC<TemplateFormDialogProps> = ({
  onCreate,
  onUpdate,
  editingTemplate = null,
  isControlled,
  open,
  onOpenChange,
}) => {
  return (
    <FormDialog<Template>
      FormComponent={TemplateForm}
      onCreate={onCreate}
      onUpdate={onUpdate}
      editingItem={editingTemplate}
      isControlled={isControlled}
      open={open}
      onOpenChange={onOpenChange}
    />
  );
};
