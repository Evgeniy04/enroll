import { BaseToast, ToastProps } from "@/components/ui/base-toast";
import { ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  success: (toastProps: ToastProps) => <BaseToast variant='default' toastProps={toastProps}/>,
  error: (toastProps: ToastProps) => <BaseToast variant='destructive' toastProps={toastProps}/>
};

export const TOAST_DEFAULT_POSITION = 'bottom';
