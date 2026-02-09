import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { InfoCard } from "@/components/ui/info-card";
import OtpInput from "@/components/ui/otp-input";
import { ResendButton } from "@/components/ui/ResendButton";
import { Text } from "@/components/ui/text";
import { StepCard } from "@/screens/auth/Otp/components/StepCard";
import { getStringAsync } from "expo-clipboard";
import { OTPInputRef } from "input-otp-native";
import { ClipboardPaste, Lock, MessageCircle, Zap } from "lucide-react-native";
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
  const [isResending, setIsResending] = useState(false);

  const handlePaste = async () => {
    const text = await getStringAsync();
    const digits = text.replace(/\D/g, "").slice(0, 6);
    ref.current?.setValue(digits);
  };

  const handleResend = async () => {
    if (isResending) return;

    setIsResending(true);

    try {
      await onResend();
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

        <Button variant="secondary" size="lg" onPress={handlePaste}>
          <Icon as={ClipboardPaste} />
          <Text>Вставить скопированный код</Text>
        </Button>

        <ResendButton
          delay={RESEND_DELAY}
          isProcessing={isResending}
          processingText="Отправка..."
          readyText="Отправить код снова"
          countdownText={(seconds) => `Отправить повторно через ${seconds}с`}
          onPress={handleResend}
        />
      </View>
    </StepCard>
  );
};
