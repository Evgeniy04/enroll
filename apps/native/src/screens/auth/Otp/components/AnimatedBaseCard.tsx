import { MotiView } from "moti";
import { FC } from "react";

type AnimatedBaseCardProps = {
  children: React.ReactNode;
  onDidAnimate?: () => void;
};

export const AnimatedBaseCard: FC<AnimatedBaseCardProps> = ({
  children,
  onDidAnimate,
}) => (
  <MotiView
    className="m-5 flex-1 items-center justify-center gap-5"
    from={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ type: "timing", duration: 250 }}
    onDidAnimate={onDidAnimate}
  >
    {children}
  </MotiView>
);
