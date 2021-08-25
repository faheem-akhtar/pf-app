import { ReactElement, RefObject } from 'react';

export interface WindowUseMouseDownInterface {
  /**
   * Should listen to global mouse down event
   */
  shouldListen: boolean;

  /**
   * Called on window mouse down if shouldListen is true
   */
  onWindowMouseDown: (e: MouseEvent) => void;

  /**
   * Ignore given element and all it's children mouse down events
   */
  ignoreElementRef?: RefObject<ReactElement>;
}
