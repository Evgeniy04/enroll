import { authClient, getErrorMessage } from "@/lib/auth-client";
import { OtpInputStep } from "@/screens/auth/Otp/components/OtpInputStep";
import { OtpVerificationStep } from "@/screens/auth/Otp/components/OtpVerificationStep";
import { useRouter } from "expo-router";
import { OTPInputRef } from "input-otp-native";
import { AnimatePresence, MotiView } from "moti";
import { FC, useRef, useState } from "react";
import Toast from "react-native-toast-message";

export const Otp: FC = () => {
  const router = useRouter();
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
    });
  };

  const handleNext = async () => {
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
    <AnimatePresence exitBeforeEnter>
      {step === "input" ? (
        <MotiView
          key="step1"
          className="flex-1"
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "timing", duration: 250 }}
        >
          <OtpInputStep
            email={email}
            onChangeEmail={setEmail}
            onBack={() => router.back()}
            onNext={handleNext}
          />
        </MotiView>
      ) : (
        <MotiView
          key="step2"
          className="flex-1"
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "timing", duration: 250 }}
          onDidAnimate={() => {
            otpVerificationRef.current?.focus();
          }}
        >
          <OtpVerificationStep
            email={email}
            onBack={() => setStep("input")}
            onComplete={handleComplete}
            ref={otpVerificationRef}
          />
        </MotiView>
      )}
    </AnimatePresence>
  );
};
