import { WindowLocalStorageInterface } from 'services/window/local-storage/interface';

export const mockWindowLocalStorage = (): WindowLocalStorageInterface => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
});
