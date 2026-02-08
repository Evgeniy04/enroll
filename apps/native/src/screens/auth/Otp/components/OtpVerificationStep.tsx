import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { InfoCard } from "@/components/ui/info-card";
import OtpInput from "@/components/ui/otp-input";
import { Text } from "@/components/ui/text";
import { StepCard } from "@/screens/auth/Otp/components/StepCard";
import { OTPInputRef } from "input-otp-native";
import { Lock, MessageCircle, RotateCcw, Zap } from "lucide-react-native";
import { FC, RefObject, useEffect, useState } from "react";
import { View } from "react-native";

const RESEND_DELAY = 60;

interface OtpVerificationStepProps {
  email: string;
  onBack: () => void;
  onResend: () => Promise<void>;
  onComplete?: (otp: string) => void;
  ref: RefObject<OTPInputRef | null>;
}

export const OtpVerificationStep: FC<OtpVerificationStepProps> = ({
  email,
  onResend,
  onComplete,
  onBack,
  ref,
}) => {
  const [countdown, setCountdown] = useState(RESEND_DELAY);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer: number = setInterval(
      () => setCountdown((prev) => prev - 1),
      1000,
    );

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || isResending) return;

    setIsResending(true);

    try {
      await onResend();
      setCountdown(RESEND_DELAY);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <StepCard
      icon={Lock}
      iconColor="purple"
      accentIcon={Zap}
      accentColor="emerald"
      title="Проверьте почту"
      subtitle={email}
      InfoCardsContent={
        <InfoCard
          icon={MessageCircle}
          title="Новое письмо"
          description="Мы отправили вам 6-значный код для безопасного входа в систему"
        />
      }
      onBack={onBack}
    >
      <View className="gap-5">
        <Text className="text-center text-muted-foreground">
          Введите 6-значный код подтверждения
        </Text>

        <OtpInput ref={ref} onComplete={onComplete} />

        {countdown > 0 ? (
          <Text variant="muted" className="text-center text-muted-foreground">
            Отправить повторно через <Text>{countdown}с</Text>
          </Text>
        ) : (
          <Button
            variant="outline"
            onPress={handleResend}
            disabled={isResending}
          >
            <Icon as={RotateCcw} />
            <Text>{isResending ? "Отправка..." : "Отправить код снова"}</Text>
          </Button>
        )}
      </View>
    </StepCard>
  );
};
