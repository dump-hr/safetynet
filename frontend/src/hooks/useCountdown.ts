import { useEffect, useRef, useState } from 'react';

const useCountdown = (startCount: number) => {
  const [count, setCount] = useState(startCount);
  const timer = useRef<NodeJS.Timer | null>(null);

  const startTimer = () => {
    timer.current = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
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
    setCount(startCount);
    startTimer();
  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    if (count < 0) {
      stopTimer();
    }
  }, [count]);

  return { count: Math.max(count, 0), reset };
};

export default useCountdown;
