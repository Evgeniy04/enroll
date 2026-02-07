import { cn } from "@/lib/utils";
import { MotiText, MotiView } from "moti";
import { FC } from "react";
import { View } from "react-native";

type LoadingProps = {
  message?: string;
  className?: string;
};

export const Loading: FC<LoadingProps> = ({
  message = "Синхронизируем данные...",
  className,
}) => {
  const letters = message.split("");

  return (
    <View
      className={cn(
        "flex-1 items-center justify-center bg-slate-50 dark:bg-zinc-950",
        className,
      )}
    >
      {/* Слот-индикаторы */}
      <View className="h-24 flex-row items-end justify-center gap-x-2">
        {[0, 1, 2, 3].map((i) => (
          <MotiView
            key={i}
            from={{ height: 20, opacity: 0.3, backgroundColor: "#94a3b8" }}
            animate={{
              height: [20, 60, 20],
              opacity: [0.3, 1, 0.3],
              backgroundColor: ["#94a3b8", "#0ea5e9", "#94a3b8"],
            }}
            transition={{
              type: "timing",
              duration: 1000,
              loop: true,
              delay: i * 150,
              repeatReverse: false,
            }}
            className="w-3 rounded-full"
          />
        ))}
      </View>

      {/* Центральный блок */}
      <View className="mt-8 items-center">
        <MotiView
          from={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{
            type: "timing",
            duration: 800,
            loop: true,
          }}
          className="relative h-16 w-16 items-center justify-center rounded-2xl bg-neutral-400 shadow-xl shadow-sky-500/20 dark:bg-zinc-900"
        >
          <View className="absolute top-0 h-4 w-full rounded-t-2xl bg-sky-500" />
          <View className="mt-2 h-1 w-8 rounded-full bg-slate-200 dark:bg-zinc-800" />
          <View className="mt-2 h-1 w-8 rounded-full bg-slate-200 dark:bg-zinc-800" />
        </MotiView>

        {/* Анимированный текст */}
        <View className="mt-8 flex-row flex-wrap justify-center px-6">
          {letters.map((char, index) => (
            <MotiText
              key={`${char}-${index}`}
              from={{ opacity: 0.2, translateY: 0 }}
              animate={{ opacity: 1, translateY: -4 }}
              transition={{
                type: "timing",
                duration: 600,
                loop: true,
                delay: index * 40,
              }}
              className="text-sm font-bold uppercase tracking-widest text-cyan-500 dark:text-sky-400"
            >
              {char === " " ? "\u00A0" : char}
            </MotiText>
          ))}
        </View>
      </View>
    </View>
  );
};
