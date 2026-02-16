import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { withForm } from "@/hooks/forms/form";
import { BaseCard } from "@/screens/auth/Otp/components/BaseCard";
import { formOpts } from "@/screens/auth/Otp/sharedForm";
import { Mail, Sparkles } from "lucide-react-native";
import { View } from "react-native";

interface EmailFormProps {
  onBack: () => void;
}

export const EmailForm = withForm({
  ...formOpts,
  props: {} as EmailFormProps,
  render: function Render({ form, onBack }) {
    return (
      <BaseCard
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
          <form.AppField name="email">
            {({ InputField }) => (
              <InputField
                label="Адрес электронной почты"
                placeholder="name@example.com"
                textContentType="emailAddress"
                autoComplete="email"
                type="email"
                autoCapitalize="none"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() =>
                  form.handleSubmit({ intent: "requestOtp" })
                }
                required
              />
            )}
          </form.AppField>

          <form.Subscribe
            selector={({ isDefaultValue, canSubmit, isSubmitting }) => ({
              isDisabled: isDefaultValue || !canSubmit || isSubmitting,
            })}
          >
            {({ isDisabled }) => (
              <Button
                size="lg"
                disabled={isDisabled}
                onPress={() => form.handleSubmit({ intent: "requestOtp" })}
              >
                <Text>Продолжить</Text>
                <Icon as={Sparkles} className="text-primary-foreground" />
              </Button>
            )}
          </form.Subscribe>
        </View>
      </BaseCard>
    );
  },
});
