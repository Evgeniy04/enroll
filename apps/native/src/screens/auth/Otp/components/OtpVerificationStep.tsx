import { InfoCard } from "@/components/ui/info-card";
import OtpInput from "@/components/ui/otp-input";
import { Text } from "@/components/ui/text";
import { StepCard } from "@/screens/auth/Otp/components/StepCard";
import { Lock, MessageCircle, Zap } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

interface OtpVerificationStepProps {
  email: string;
  onBack: () => void;
}

export const OtpVerificationStep: FC<OtpVerificationStepProps> = ({
  email,
  onBack,
}) => {
  const handleComplete = (code: string) => {
    console.log(code);
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
      <View>
        <Text className="text-center text-muted-foreground">
          Введите 6-значный код подтверждения
        </Text>
        <OtpInput onComplete={handleComplete} />
      </View>
    </StepCard>
  );
};
