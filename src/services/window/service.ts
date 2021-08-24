import google from 'google-one-tap';
import { helpersIsClient } from 'helpers/is-client';
import { windowLocalStorageDefaultState } from './local-storage/default-state';
import { windowLocalStorageMakeWrapper } from './local-storage/make-wrapper';

export const WindowService = {
  addEventListener: <K extends keyof WindowEventMap>(
    type: K,
    handler: (this: Window, ev: WindowEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions | undefined
  ): void => window.addEventListener(type, handler, options),
  removeEventListener: <K extends keyof WindowEventMap>(
    type: K,
    handler: (this: Window, ev: WindowEventMap[K]) => void
  ): void => window.removeEventListener(type, handler),
  document: helpersIsClient ? window?.document : null,
  localStorage: helpersIsClient ? windowLocalStorageMakeWrapper(window) : windowLocalStorageDefaultState,
  getGapi: (): typeof gapi | null => (helpersIsClient ? window?.gapi : null),
  getFB: (): typeof FB | null => (helpersIsClient ? window?.FB : null),
  getGoogle: (): typeof google | null => (helpersIsClient ? window?.google : null),
  getGrecaptcha: (): typeof grecaptcha => window.grecaptcha,
};
