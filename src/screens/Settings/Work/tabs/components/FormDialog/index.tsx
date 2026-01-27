import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { FC } from "react";

export interface FormProps<T> {
  initialData: T | null;
  onCreate: (data: Omit<T, "id">) => void;
  onUpdate: (patch: Partial<T> & { id: string }) => void;
}

export interface FormDialogProps<T> extends Omit<FormProps<T>, "initialData"> {
  FormComponent: FC<FormProps<T>>;
  editingItem: T | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FormDialog = <T,>({
  FormComponent,
  onCreate,
  onUpdate,
  editingItem,
  open,
  onOpenChange,
}: FormDialogProps<T>) => {
  const { width: screenWidth } = useWindowDimensions();

  const handleCreatePress = (data: Omit<T, "id">) => {
    onCreate(data);
    onOpenChange?.(false);
  };

  const handleUpdatePress = (patch: Partial<T> & { id: string }) => {
    onUpdate(patch);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent style={{ width: screenWidth - 40, alignSelf: "center" }}>
        <FormComponent
          initialData={editingItem}
          onCreate={handleCreatePress}
          onUpdate={handleUpdatePress}
        />
      </DialogContent>
    </Dialog>
  );
};
