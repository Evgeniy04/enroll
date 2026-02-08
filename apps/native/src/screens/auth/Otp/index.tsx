import { authClient, getErrorMessage } from "@/lib/auth-client";
import { OtpInputStep } from "@/screens/auth/Otp/components/OtpInputStep";
import { OtpVerificationStep } from "@/screens/auth/Otp/components/OtpVerificationStep";
import { useRouter } from "expo-router";
import { OTPInputRef } from "input-otp-native";
import { AnimatePresence } from "moti";
import { FC, useRef, useState } from "react";
import {
  KeyboardAwareScrollView,
  KeyboardController,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { AnimatedStepCard } from "./components/AnimatedStepCard";

export const Otp: FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState<"input" | "verification">("input");
  const [email, setEmail] = useState("");

  const otpVerificationRef = useRef<OTPInputRef>(null);

  const handleAuthError = (errorCode?: string) => {
    if (!errorCode) return;

    const description = getErrorMessage(errorCode);
    Toast.show({
      type: "error",
      props: {
        title: "Возникла проблема",
        description: description,
      },
      bottomOffset: KeyboardController.isVisible()
        ? KeyboardController.state().height
        : insets.bottom,
    });
  };

  const handleSendVerificationOtp = async () => {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });

    if (error) return handleAuthError(error.code);
    setStep("verification");
  };

  const handleComplete = async (otp: string) => {
    const { error } = await authClient.signIn.emailOtp({
      email,
      otp,
    });

    if (error) {
      handleAuthError(error.code);
      otpVerificationRef.current?.clear();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="grow"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <AnimatePresence exitBeforeEnter>
        <AnimatedStepCard
          key={step}
          onDidAnimate={() => {
            otpVerificationRef.current?.focus();
          }}
        >
          {step === "input" ? (
            <OtpInputStep
              email={email}
              onChangeEmail={setEmail}
              onBack={() => router.back()}
              onNext={handleSendVerificationOtp}
            />
          ) : (
            <OtpVerificationStep
              ref={otpVerificationRef}
              email={email}
              onResend={handleSendVerificationOtp}
              onComplete={handleComplete}
              onBack={() => setStep("input")}
            />
          )}
        </AnimatedStepCard>
      </AnimatePresence>
    </KeyboardAwareScrollView>
  );
};
