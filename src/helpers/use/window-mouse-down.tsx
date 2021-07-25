import { useEffect } from 'react';

import { UseWindowMouseDownInterface } from './window-mouse-down.interface';

/**
 * Run callback on window mouse down when shouldListen is true
 * @param props
 */
export const useWindowMouseDown = ({
  shouldListen,
  onWindowMouseDown,
  ignoreElementRef,
}: UseWindowMouseDownInterface): void => {
  const onMouseDown = (e: MouseEvent): void => {
    if (ignoreElementRef && e.composedPath().includes(ignoreElementRef.current as unknown as Node)) {
      return;
    }

    onWindowMouseDown(e);
  };

  useEffect(() => {
    if (shouldListen) {
      window.addEventListener('mousedown', onMouseDown);

      return (): void => window.removeEventListener('mousedown', onMouseDown);
    }
  });
};
