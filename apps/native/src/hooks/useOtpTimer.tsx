import { useCallback, useEffect, useState } from "react";

export const useOtpTimer = (initialCountdown: number = 60) => {
  const [countdown, setCountdown] = useState(initialCountdown);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    setCanResend(true);
  }, [countdown]);

  const reset = useCallback(() => {
    setCountdown(initialCountdown);
    setCanResend(false);
  }, [initialCountdown]);

  return { countdown, canResend, reset };
};
