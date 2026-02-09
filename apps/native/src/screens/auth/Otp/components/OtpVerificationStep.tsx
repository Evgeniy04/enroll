import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { InfoCard } from "@/components/ui/info-card";
import OtpInput from "@/components/ui/otp-input";
import { Text } from "@/components/ui/text";
import { useOtpTimer } from "@/hooks/useOtpTimer";
import { StepCard } from "@/screens/auth/Otp/components/StepCard";
import { OTPInputRef } from "input-otp-native";
import { Lock, MessageCircle, RotateCcw, Zap } from "lucide-react-native";
import { FC, RefObject, useState } from "react";
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
  const { countdown, canResend, reset } = useOtpTimer(RESEND_DELAY);
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    if (isResending) return;

    setIsResending(true);

    try {
      await onResend();
      reset();
      ref.current?.clear();
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

        <Button
          variant="outline"
          onPress={handleResend}
          disabled={!canResend || isResending}
        >
          <Icon as={RotateCcw} />
          <Text>
            {canResend
              ? isResending
                ? "Отправка..."
                : "Отправить код снова"
              : `Отправить повторно через ${countdown}с`}
          </Text>
        </Button>
      </View>
    </StepCard>
  );
};
