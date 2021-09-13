import { WindowLocalStorageInterface } from 'services/window/local-storage/interface';
import { AnyValueType } from 'types/any/value.type';

export const mockWindowLocalStorage = (getItemMockValue: AnyValueType = undefined): WindowLocalStorageInterface => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockReturnValue(getItemMockValue),
  removeItem: jest.fn(),
});
