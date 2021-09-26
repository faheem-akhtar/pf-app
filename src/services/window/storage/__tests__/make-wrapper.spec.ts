import { windowStorageStub } from 'stubs/window/storage.stub';

import { WindowStorageInterface } from '../interface';
import { windowStorageMakeWrapper } from '../make-wrapper';

describe('windowStorageMakeWrapper', () => {
  let localStorageStub: WindowStorageInterface;
  beforeEach(() => {
    localStorageStub = windowStorageStub();
  });

  it('should have default localStorage state for unsupported browsers', () => {
    const localStorageWrapper = windowStorageMakeWrapper({} as Storage);
    localStorageWrapper.setItem('a', 1);
    expect(localStorageWrapper.getItem('a')).toBeNull();
    expect(localStorageWrapper.removeItem('a')).toBeNull();
  });

  describe('setItem', () => {
    let localStorageWrapper: WindowStorageInterface;
    beforeEach(() => {
      localStorageWrapper = windowStorageMakeWrapper(localStorageStub as Storage);
    });

    test('if the given not-object like value is storaged', () => {
      localStorageWrapper.setItem('a', 16);
      expect(localStorageStub.setItem).toHaveBeenCalledWith('a', '16');
    });

    test('if the given object like value is stored', () => {
      localStorageWrapper.setItem('a', { a: 2 });
      expect(localStorageStub.setItem).toHaveBeenCalledWith('a', JSON.stringify({ a: 2 }));
    });
  });

  describe('getItem', () => {
    test('if it gets the value that belongs to the given key', () => {
      const localStorageWrapper = windowStorageMakeWrapper(windowStorageStub(JSON.stringify({ a: 'b' })) as Storage);

      expect(localStorageWrapper.getItem('a')).toEqual({ a: 'b' });
    });
  });

  describe('removeItem', () => {
    test('if value of the given key is removed', () => {
      const localStorageWrapper = windowStorageMakeWrapper(localStorageStub as Storage);
      localStorageWrapper.removeItem('a');
      expect(localStorageStub.removeItem).toHaveBeenCalledWith('a');
    });
  });

  describe('clear', () => {
    it('should clear the storage', () => {
      const localStorageWrapper = windowStorageMakeWrapper(localStorageStub as Storage);
      localStorageWrapper.clear();
      expect(localStorageStub.clear).toHaveBeenCalled();
    });
  });
});
