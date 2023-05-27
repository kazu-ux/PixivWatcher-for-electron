import { RefObject, useEffect } from 'react';

const useMutationObserver = (
  element: RefObject<HTMLDivElement>,
  callback: (arg0: MutationRecord[]) => void,
  config: MutationObserverInit | undefined
) => {
  useEffect(() => {
    const mutationObserver = new MutationObserver((mutations) => {
      mutationObserver.disconnect();
      callback(mutations);

      element.current && mutationObserver.observe(element.current, config);
    });

    element.current && mutationObserver.observe(element.current, config);

    return () => mutationObserver.disconnect();
  }, []);
};

export default useMutationObserver;
