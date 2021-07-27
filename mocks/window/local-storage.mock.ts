import { WindowLocalStorageInterface } from 'helpers/window/local-storage/interface';

export const WindowLocalStorageMock = (): WindowLocalStorageInterface => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
});
