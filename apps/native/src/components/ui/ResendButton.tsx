import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useOtpTimer } from "@/hooks/useOtpTimer";
import { LucideIcon, RotateCcw } from "lucide-react-native";
import { ComponentProps, FC } from "react";

interface ResendButtonProps extends ComponentProps<typeof Button> {
  /** Задержка перед повторным действием в секундах */
  delay: number;
  /** Флаг выполнения действия */
  isProcessing?: boolean;
  /** Функция, выполняемая по нажатию */
  onPress: () => Promise<void>;
  /** Текст для кнопки, когда действие доступно */
  readyText?: string;
  /** Текст для кнопки, когда действие выполняется */
  processingText?: string;
  /** Функция для генерации текста таймера */
  countdownText?: (seconds: number) => string;
  /** Иконка для кнопки */
  icon?: LucideIcon;
}

export const ResendButton: FC<ResendButtonProps> = ({
  delay,
  isProcessing = false,
  readyText = "Повторить действие",
  processingText = "Выполняется...",
  countdownText = (seconds) => `Повтор через ${seconds}с`,
  onPress,
  icon = RotateCcw,
  disabled,
  ...props
}) => {
  const { countdown, canResend, reset } = useOtpTimer(delay);

  const handlePress = async () => {
    await onPress();
    reset();
  };

  return (
    <Button
      {...props}
      variant="ghost"
      onPress={handlePress}
      disabled={!canResend || isProcessing || disabled}
      className="flex-row items-center"
    >
      {icon && <Icon as={icon} />}
      <Text className="ml-2">
        {canResend
          ? isProcessing
            ? processingText
            : readyText
          : countdownText(countdown)}
      </Text>
    </Button>
  );
};
