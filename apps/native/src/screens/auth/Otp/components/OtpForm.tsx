import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Icon } from "@/components/ui/icon";
import { InfoCard } from "@/components/ui/info-card";
import OtpInput from "@/components/ui/otp-input";
import { ResendButton } from "@/components/ui/ResendButton";
import { Text } from "@/components/ui/text";
import { withForm } from "@/hooks/forms/form";
import { BaseCard } from "@/screens/auth/Otp/components/BaseCard";
import { formOpts } from "@/screens/auth/Otp/sharedForm";
import { useStore } from "@tanstack/react-form";
import {
  addClipboardListener,
  ContentType,
  getStringAsync,
} from "expo-clipboard";
import { OTPInputRef } from "input-otp-native";
import { ClipboardPaste, Lock, MessageCircle, Zap } from "lucide-react-native";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { AppState, View } from "react-native";

const RESEND_DELAY = 60;

interface OtpFormProps {
  ref: RefObject<OTPInputRef | null>;
  onBack: () => void;
}

export const OtpForm = withForm({
  ...formOpts,
  props: {} as OtpFormProps,
  render: function Render({ form, ref, onBack }) {
    const appState = useRef(AppState.currentState);
    const [isResending, setIsResending] = useState(false);
    const email = useStore(form.store, (state) => state.values.email);

    const handlePaste = useCallback(async () => {
      const text = await getStringAsync();
      const digits = text.replace(/\D/g, "").slice(0, 6);
      ref.current?.setValue(digits);
    }, [ref]);

    useEffect(() => {
      const subscription = addClipboardListener(({ contentTypes }) => {
        if (contentTypes.includes(ContentType.PLAIN_TEXT)) {
          handlePaste();
        }
      });

      const appStateListener = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
          )
            handlePaste();
          appState.current = nextAppState;
        },
      );

      return () => {
        subscription.remove();
        appStateListener.remove();
      };
    }, [handlePaste]);

    const handleResend = async () => {
      if (isResending) return;

      setIsResending(true);

      try {
        await form.handleSubmit({ intent: "resendOtp" });
        ref.current?.clear();
      } finally {
        setIsResending(false);
      }
    };

    return (
      <BaseCard
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

          <form.AppField name="otp">
            {({ state, handleChange }) => (
              <Field>
                <OtpInput
                  ref={ref}
                  onComplete={(otp) => {
                    handleChange(otp);
                    form.handleSubmit({ intent: "verifyOtp" });
                  }}
                />

                <FieldError errors={state.meta.errors} />
              </Field>
            )}
          </form.AppField>

          <form.Subscribe
            selector={({ isDefaultValue, canSubmit, isSubmitting }) => ({
              isDisabled: isDefaultValue || !canSubmit || isSubmitting,
            })}
          >
            {({ isDisabled }) => (
              <>
                <Button
                  disabled={isDisabled}
                  variant="secondary"
                  size="lg"
                  onPress={handlePaste}
                >
                  <Icon as={ClipboardPaste} />
                  <Text>Вставить скопированный код</Text>
                </Button>

                <ResendButton
                  disabled={isDisabled}
                  delay={RESEND_DELAY}
                  isProcessing={isResending}
                  processingText="Отправка..."
                  readyText="Отправить код снова"
                  countdownText={(seconds) =>
                    `Отправить повторно через ${seconds}с`
                  }
                  onPress={handleResend}
                />
              </>
            )}
          </form.Subscribe>
        </View>
      </BaseCard>
    );
  },
});
