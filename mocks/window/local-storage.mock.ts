import { AnyValueType } from 'types/any/value.type';
import { WindowLocalStorageInterface } from 'services/window/local-storage/interface';

export const mockWindowLocalStorage = (getItemMockValue: AnyValueType = undefined): WindowLocalStorageInterface => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockReturnValue(getItemMockValue),
  removeItem: jest.fn(),
});
