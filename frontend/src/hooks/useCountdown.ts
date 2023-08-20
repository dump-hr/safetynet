import { useEffect, useRef, useState } from 'react';

const useCountdown = (
  startCountSeconds: number,
  decrement = 1000,
  disabled = false
) => {
  const [count, setCount] = useState(startCountSeconds * 1000);
  const timer = useRef<NodeJS.Timer | null>(null);

  const startTimer = () => {
    timer.current = setInterval(() => {
      setCount((prev) => prev - decrement);
    }, decrement);
  };

  const stopTimer = () => {
    if (timer.current === null) {
      return;
    }
    clearInterval(timer.current);
    timer.current = null;
  };

  const reset = () => {
    stopTimer();
    setCount(startCountSeconds * 1000);
    if (!disabled) startTimer();
  };

  useEffect(() => {
    if (!disabled) startTimer();
    else stopTimer();

    return () => {
      stopTimer();
    };
  }, [disabled]);

  useEffect(() => {
    if (count < 0) {
      stopTimer();
    }
  }, [count]);

  return {
    count: Math.max(count, 0),
    countSeconds: Math.max(count / 1000, 0),
    countPercentage: Math.max((count / (startCountSeconds * 1000)) * 100, 0),
    reset,
  };
};

export default useCountdown;
