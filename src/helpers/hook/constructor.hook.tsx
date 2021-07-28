import { useRef } from 'react';

/**
 * Hook that simulates the class constructor behavior
 * Use it for initialization that need to be done before rendering
 * @param fn Function to be called once on component initialization
 */
export const useConstructorHook = (fn: Function): void => {
  const hasBeenCalledRef = useRef(false);

  if (hasBeenCalledRef.current) {
    return;
  }

  fn();
  hasBeenCalledRef.current = true;
};
