import { WindowStorageInterface } from 'services/window/storage/interface';
import { AnyValueType } from 'types/any/value.type';

export const windowStorageStub = (getItemMockValue: AnyValueType = undefined): WindowStorageInterface => ({
  setItem: jest.fn(),
  getItem: jest.fn().mockReturnValue(getItemMockValue),
  removeItem: jest.fn(),
  clear: jest.fn(),
});
