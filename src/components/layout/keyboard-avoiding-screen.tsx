import { ComponentProps, ReactNode } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type KeyboardAvoidingScreenProps = Omit<
  ComponentProps<typeof KeyboardAvoidingView>,
  'children'
> & {
  children: ReactNode;
};

export function KeyboardAvoidingScreen({
  children,
  ...props
}: KeyboardAvoidingScreenProps) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='flex-1' {...props}>
      <ScrollView>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}