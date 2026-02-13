import { cn } from "@/lib/utils";
import { OTPInput, OTPInputRef, type SlotProps } from "input-otp-native";
import React, { RefObject, useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface AppleOTPInputProps {
  ref?: RefObject<OTPInputRef | null>;
  className?: string;
  onComplete?: (otp: string) => void;
}

export default function AppleOTPInput({
  ref,
  className,
  onComplete,
}: AppleOTPInputProps) {
  return (
    <OTPInput
      ref={ref}
      onComplete={onComplete}
      maxLength={6}
      render={({ slots }) => (
        <View
          className={cn(
            "flex-row items-center justify-center gap-2",
            className,
          )}
        >
          {slots.map((slot, idx) => (
            <Slot key={idx} {...slot} />
          ))}
        </View>
      )}
    />
  );
}

function Slot({ char, isActive, hasFakeCaret }: SlotProps) {
  return (
    <View
      className={cn(
        "h-14 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white",
        {
          "border-2 border-black": isActive,
        },
      )}
    >
      {char !== null && (
        <Text className="text-2xl font-medium text-gray-900">{char}</Text>
      )}
      {hasFakeCaret && <FakeCaret />}
    </View>
  );
}

function FakeCaret() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 }),
      ),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const baseStyle = {
    width: 2,
    height: 28,
    backgroundColor: "#000",
    borderRadius: 1,
  };

  return (
    <View className="absolute h-full w-full items-center justify-center">
      <Animated.View style={[baseStyle, animatedStyle]} />
    </View>
  );
}
