import google from 'google-one-tap';

import { helpersIsClient } from 'helpers/is-client';

import { windowStorageDefaultState } from './storage/default-state';
import { windowStorageMakeWrapper } from './storage/make-wrapper';

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
  localStorage: helpersIsClient ? windowStorageMakeWrapper(window.localStorage) : windowStorageDefaultState,
  sessionStorage: helpersIsClient ? windowStorageMakeWrapper(window.sessionStorage) : windowStorageDefaultState,
  getGapi: (): typeof gapi | null => (helpersIsClient ? window?.gapi : null),
  getFB: (): typeof FB | null => (helpersIsClient ? window?.FB : null),
  getGoogle: (): typeof google | null => (helpersIsClient ? window?.google : null),
  getGrecaptcha: (): typeof grecaptcha => window.grecaptcha,
};
