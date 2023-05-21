import { useEffect } from 'react';

export default function useInterval(callback: () => void, delay?: number) {
  useEffect(() => {
    const interval = setInterval(() => callback(), delay || 0);
    return () => clearInterval(interval);
  }, []);
}
