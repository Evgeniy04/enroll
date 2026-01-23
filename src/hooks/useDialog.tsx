import { Dialog } from '@/components/ui/dialog';
import { ComponentType, ReactNode, useState } from 'react';

export function useDialog() {
  const [ dialogNode, setDialogNode ] = useState<ReactNode | null>(null);

  const closeDialog = () => setDialogNode(null);

  const openDialog = <P extends object>(
    Component: ComponentType<P>,
    props: P
  ) => {
    setDialogNode(
      <Dialog open onOpenChange={(open) => !open && closeDialog()}>
        <Component
          {...props}
        />
      </Dialog>
    );
  };

  return { openDialog, closeDialog, DialogElement: dialogNode };
}
