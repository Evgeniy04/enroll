import { MotiView } from "moti";
import { Children, ReactNode } from "react";
import { useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

interface AnimatedPagerProps {
  index: number;
  children: ReactNode;
}

export const AnimatedPager = ({ index, children }: AnimatedPagerProps) => {
  const { width } = useWindowDimensions();
  const pages = Children.toArray(children);

  return pages.map((page, i) => (
    <MotiView
      key={i}
      className="absolute inset-0"
      animate={{
        translateX: (i - index) * width,
        opacity: +(i === index),
      }}
      pointerEvents={i === index ? "auto" : "none"}
    >
      <KeyboardAwareScrollView
        contentContainerClassName="grow"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView className="m-5 flex-1 items-center justify-center gap-5">
          {page}
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </MotiView>
  ));
};
