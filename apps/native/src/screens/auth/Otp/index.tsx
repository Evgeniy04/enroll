import { Loading } from "@/components/ui/loading";
import { useAppForm } from "@/hooks/forms/form";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { AnimatedPager } from "@/screens/auth/Otp/components/AnimatedPager";
import { EmailForm } from "@/screens/auth/Otp/components/EmailForm";
import { OtpForm } from "@/screens/auth/Otp/components/OtpForm";
import { AuthStatus } from "@/screens/auth/Otp/Otp.types";
import { createAuthSchema, formOpts } from "@/screens/auth/Otp/sharedForm";
import { useRouter } from "expo-router";
import { OTPInputRef } from "input-otp-native";
import { FC, useRef, useState } from "react";
import { KeyboardController } from "react-native-keyboard-controller";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const handleAuthError = (insets: EdgeInsets, errorCode?: string) => {
  if (!errorCode) return;

  Toast.show({
    type: "error",
    props: {
      title: "Возникла проблема",
      description: getErrorMessage(errorCode),
    },
    bottomOffset: KeyboardController.isVisible()
      ? KeyboardController.state().height
      : insets.bottom,
  });
};

export const Otp: FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const otpInputRef = useRef<OTPInputRef>(null);
  const [status, setStatus] = useState<AuthStatus>("idle");

  const form = useAppForm({
    ...formOpts,
    validators: {
      onSubmit: createAuthSchema(status !== "idle"),
    },
    onSubmit: async ({ value: { email, otp }, meta: { intent } }) => {
      if (intent === "requestOtp" || intent === "resendOtp") {
        const { error } = await authClient.emailOtp.sendVerificationOtp({
          email,
          type: "sign-in",
        });

        if (error) return handleAuthError(insets, error.code);

        await KeyboardController.dismiss({
          animated: false,
        });
        setStatus("otpRequested");
        return;
      }

      if (intent === "verifyOtp") {
        setStatus("verifying");
        const { error } = await authClient.signIn.emailOtp({ email, otp });

        if (error) {
          setStatus("otpRequested");
          handleAuthError(insets, error.code);
          otpInputRef.current?.clear();
          return;
        }

        setStatus("verified");
      }
    },
  });

  if (status === "verified") return <Loading />;

  return (
    <AnimatedPager index={+(status !== "idle")}>
      <EmailForm form={form} onBack={() => router.back()} />
      <OtpForm form={form} ref={otpInputRef} onBack={() => setStatus("idle")} />
    </AnimatedPager>
  );
};
