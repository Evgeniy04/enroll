import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useState } from "react";

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

export function useConfirm() {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
  };

  const handleClose = () => setOptions(null);

  const ConfirmDialogElement = options ? (
    <ConfirmDialog
      open
      onOpenChange={(open) => !open && handleClose()}
      title={options.title}
      description={options.description}
      confirmText={options.confirmText}
      cancelText={options.cancelText}
      onConfirm={() => {
        options.onConfirm();
        handleClose();
      }}
    />
  ) : null;

  return { confirm, ConfirmDialogElement };
}
