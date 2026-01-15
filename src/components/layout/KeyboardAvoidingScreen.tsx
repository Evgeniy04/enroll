import { cn } from "@/lib/utils";
import { ComponentProps, FC, ReactNode } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type KeyboardAvoidingScreenProps = Omit<
  ComponentProps<typeof KeyboardAvoidingView>,
  'children'
> & {
  children: ReactNode;
};

export const KeyboardAvoidingScreen: FC<KeyboardAvoidingScreenProps> = ({
  children,
  ...props
}) => {
  return (
    <KeyboardAvoidingView
      {...props}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className={cn('flex-1', props.className)}
    >
      <ScrollView>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}