import { useEffect, useState } from 'react';

const useCountdown = (startCount: number) => {
  const [count, setCount] = useState(startCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const reset = () => {
    setCount(startCount);
  };

  return { count: Math.max(count, 0), reset };
};

export default useCountdown;
