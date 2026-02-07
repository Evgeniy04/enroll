import { authClient } from "@/lib/auth-client";
import { OtpInputStep } from "@/screens/auth/Otp/components/OtpInputStep";
import { OtpVerificationStep } from "@/screens/auth/Otp/components/OtpVerificationStep";
import { parse, useLinkingURL } from "expo-linking";
import { useRouter } from "expo-router";
import { OTPInputRef } from "input-otp-native";
import { AnimatePresence, MotiView } from "moti";
import { FC, useEffect, useRef, useState } from "react";

export const Otp: FC = () => {
  const url = useLinkingURL();
  const router = useRouter();
  const [step, setStep] = useState<"input" | "verification">("input");
  const [email, setEmail] = useState("");

  const otpVerificationRef = useRef<OTPInputRef>(null);

  const handleNext = async () => {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
      email,
      type: "sign-in",
    });
    console.log(data, error);

    setStep("verification");
  };

  const handleComplete = async (otp: string, externalEmail?: string) => {
    if (url && parse(url).queryParams?.otp === otp) return;

    const targetEmail = externalEmail || email;
    const { data, error } = await authClient.signIn.emailOtp({
      email: targetEmail,
      otp,
    });
    console.log(data, error);

    otpVerificationRef.current?.clear();
  };

  useEffect(() => {
    if (!url) return;

    const { queryParams } = parse(url);

    const externalEmail = queryParams?.email;
    const externalOtp = queryParams?.otp;

    if (typeof externalEmail === "string" && typeof externalOtp === "string") {
      setEmail(externalEmail);
      otpVerificationRef.current?.setValue(externalOtp);

      authClient.signIn.emailOtp({
        email: externalEmail,
        otp: externalOtp,
      });
    }
  }, [url]);

  return (
    <AnimatePresence exitBeforeEnter>
      {step === "input" && !url ? (
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
