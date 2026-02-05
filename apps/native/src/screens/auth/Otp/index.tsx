import { OtpInputStep } from "@/screens/auth/Otp/components/OtpInputStep";
import { OtpVerificationStep } from "@/screens/auth/Otp/components/OtpVerificationStep";
import { useRouter } from "expo-router";
import { AnimatePresence, MotiView } from "moti";
import { FC, useState } from "react";

export const Otp: FC = () => {
  const router = useRouter();
  const [active, setActive] = useState<"input" | "verification">("input");

  return (
    <AnimatePresence exitBeforeEnter>
      {active === "input" ? (
        <MotiView
          key="step1"
          className="flex-1"
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "timing", duration: 250 }}
        >
          <OtpInputStep
            onBack={() => router.back()}
            onNext={() => setActive("verification")}
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
        >
          <OtpVerificationStep
            email="avra.dev@yandex.ru"
            onBack={() => setActive("input")}
          />
        </MotiView>
      )}
    </AnimatePresence>
  );
};
