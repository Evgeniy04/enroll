import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert, CircleCheck } from "lucide-react-native";
import { View } from "react-native";
import { ToastConfigParams } from "react-native-toast-message";

type AlertProps = {
  title: string,
  description: string,
};

type ToastProps = ToastConfigParams<AlertProps>;

type BaseToastProps = {
  variant: 'default' | 'destructive',
  toastProps: ToastProps,
}

function BaseToast({variant, toastProps}: BaseToastProps) {
  const icon = variant === 'default' ? CircleCheck : CircleAlert;

  return <View className="w-full px-4 mb-2">
    <Alert variant={variant} icon={icon}>
      <AlertTitle>{toastProps.props.title}</AlertTitle>
      <AlertDescription>
        {toastProps.props.description}
      </AlertDescription>
    </Alert>
  </View>
}

export { AlertProps, BaseToast, ToastProps };

