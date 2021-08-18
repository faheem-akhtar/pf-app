import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * Hook that simulates the class constructor behavior
 * Use it for initialization that need to be done before rendering
 * @param fn Function to be called once on component initialization
 */
export const useConstructorHook = (fn: () => void | (() => void)): void => {
  const hasBeenCalledRef = useRef(false);
  const unmountRef: MutableRefObject<() => void | (() => void)> = useRef(() => undefined);

  useEffect(() => {
    return (): void => {
      if (unmountRef.current) {
        unmountRef.current();
      }
    };
  }, []);

  if (hasBeenCalledRef.current) {
    return;
  }

  const unmount = fn();
  if (unmount) {
    unmountRef.current = unmount;
  }
  hasBeenCalledRef.current = true;
};
