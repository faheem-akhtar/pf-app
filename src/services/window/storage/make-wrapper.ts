import { AnyValueType } from 'types/any/value.type';

import { windowStorageDefaultState } from './default-state';
import { WindowStorageInterface } from './interface';

function storageAvailable(storage: Storage): boolean {
  if (typeof storage === 'undefined') {
    return false;
  }

  try {
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

export const windowStorageMakeWrapper = (storage: Storage): WindowStorageInterface => {
  if (!storageAvailable(storage)) {
    return windowStorageDefaultState;
  }

  return {
    setItem: (key: string, value: AnyValueType): void => {
      try {
        const str = typeof value === 'object' ? JSON.stringify(value) : String(value);

        storage.setItem(key, str);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Window storage: unable to stringify value');
      }
    },
    getItem: <R>(key: string): R | null => {
      const value = storage.getItem(key);

      if (typeof value === 'string' && value.match(/^({.*})|(\[.*\])$/g) !== null) {
        try {
          return JSON.parse(value);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('Window storage is unable to parse [key:', key, '][value:', value, ']');
          return null;
        }
      }

      return value as unknown as R;
    },
    removeItem: (key: string): void => {
      storage.removeItem(key);
    },
    clear: (): void => {
      storage.clear();
    },
  };
};
