import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { StepCard } from "@/screens/auth/Otp/components/StepCard";
import { Mail, Sparkles } from "lucide-react-native";
import { FC } from "react";
import { View } from "react-native";

interface OtpInputStepProps {
  email: string;
  onChangeEmail: (email: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export const OtpInputStep: FC<OtpInputStepProps> = ({
  email,
  onChangeEmail,
  onBack,
  onNext,
}) => {
  return (
    <StepCard
      icon={Mail}
      iconColor="blue"
      accentIcon={Sparkles}
      accentColor="orange"
      title="Для начала"
      subtitle="введите адрес электронной почты."
      onBack={onBack}
    >
      <Text className="text-center text-muted-foreground">
        Мы используем одноразовый код — вход без пароля и лишних действий ✨
      </Text>

      <View className="w-full gap-6">
        <TextField
          nativeID="email"
          textContentType="emailAddress"
          autoComplete="email"
          type="email"
          autoCapitalize="none"
          returnKeyType="next"
          submitBehavior="submit"
          label="Адрес электронной почты"
          placeholder="name@example.com"
          value={email}
          onChangeText={onChangeEmail}
          onSubmitEditing={onNext}
          required
        />
        <Button size="lg" onPress={onNext}>
          <Text>Продолжить</Text>
          <Icon as={Sparkles} className="text-primary-foreground" />
        </Button>
      </View>
    </StepCard>
  );
};
