import { WindowLocalStorageInterface } from '../local-storage.interface';

export const windowLocalStorageDefaultState: WindowLocalStorageInterface = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
};
