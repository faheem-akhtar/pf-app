import { WindowStorageInterface } from './interface';

export const windowStorageDefaultState: WindowStorageInterface = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
  clear: () => null,
};
