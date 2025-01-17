import React, { useState, useEffect } from 'react';

type TargetViewPosition =
  | undefined
  | 'ABOVE_VIEWPORT'
  | 'BELOW_VIEWPORT'
  | 'VISIBLE';

export function useOnScreen(targetRef: React.RefObject<HTMLElement>) {
  const [targetViewPosition, setTargetViewPosition] =
    useState<TargetViewPosition>(undefined);

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.boundingClientRect.top > -1) return;
      setTargetViewPosition('ABOVE_VIEWPORT'); // 画面より上に表示中
    },
    {
      root: null,
      threshold: 0.5,
    }
  );

  useEffect(() => {
    // マウント時にobserverを登録
    if (targetRef.current) observer.observe(targetRef.current);

    // アンマウント時にobserverを解除
    return () => {
      observer.disconnect();
    };
  }, []);

  return targetViewPosition;
}
