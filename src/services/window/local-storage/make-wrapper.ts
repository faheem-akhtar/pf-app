import { helpersIsTest } from 'helpers/is-test';
import { windowLocalStorageDefaultState } from './default-state';

import { AnyValueType } from 'types/any/value.type';
import { WindowLocalStorageInterface } from './interface';

function storageAvailable(window: Window): boolean {
  if (typeof window.localStorage === 'undefined') {
    return false;
  }

  try {
    const x = '__storage_test__';
    window.localStorage.setItem(x, x);
    window.localStorage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

export const windowLocalStorageMakeWrapper = (window: Window): WindowLocalStorageInterface => {
  if (!storageAvailable(window)) {
    if (!helpersIsTest) {
      // eslint-disable-next-line no-console
      console.warn('Local storage is not available');
    }
    return windowLocalStorageDefaultState;
  }

  return {
    setItem: (key: string, value: AnyValueType): void => {
      try {
        const str = typeof value === 'object' ? JSON.stringify(value) : String(value);

        window.localStorage.setItem(key, str);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Local storage: unable to stringify value');
      }
    },
    getItem: <R>(key: string): R | null => {
      const value = window.localStorage.getItem(key);

      if (typeof value === 'string' && value.match(/^({.+})|(\[.+\])$/g) !== null) {
        try {
          return JSON.parse(value);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Local storage is unable to parse [key:', key, '][value:', value, ']');
          return null;
        }
      }

      return value as unknown as R;
    },
    removeItem: (key: string): void => {
      window.localStorage.removeItem(key);
    },
  };
};
