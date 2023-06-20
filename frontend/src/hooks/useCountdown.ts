import { useEffect, useState } from 'react';

const useCountdown = (startCount: number) => {
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(startCount);

  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [enabled]);

  const start = () => {
    setEnabled(true);
  };

  const reset = () => {
    setEnabled(false);
    setCount(startCount);
  };

  return { count: Math.max(count, 0), start, reset };
};

export default useCountdown;
