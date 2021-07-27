import { WindowLocalStorageInterface } from './interface';

export const windowLocalStorageDefaultState: WindowLocalStorageInterface = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
};
