import { mockWindowStorage } from 'mocks/window/storage.mock';

import { WindowStorageInterface } from '../interface';
import { windowStorageMakeWrapper } from '../make-wrapper';

describe('windowStorageMakeWrapper', () => {
  let localStorageMock: WindowStorageInterface;
  beforeEach(() => {
    localStorageMock = mockWindowStorage();
  });

  it('should have default localStorage state for unsupported browsers', () => {
    Object.defineProperty(window, 'localStorage', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    const localStorageMake = windowStorageMakeWrapper(window.localStorage);
    expect(localStorageMake.setItem('a', 1)).toBeNull();
    expect(localStorageMake.getItem('a')).toBeNull();
    expect(localStorageMake.removeItem('a')).toBeNull();
  });

  it('should have default localStorage state for unsupported localStorage functions', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {},
    });

    const localStorageMake = windowStorageMakeWrapper(window.localStorage);
    expect(localStorageMake.setItem('a', 1)).toBeNull();
    expect(localStorageMake.getItem('a')).toBeNull();
    expect(localStorageMake.removeItem('a')).toBeNull();
  });

  it('should have the given localStorage state for supported browsers', () => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    const localStorageMake = windowStorageMakeWrapper(window.localStorage);
    expect(localStorageMake.setItem('a', 3)).not.toBeNull();
  });

  describe('setItem', () => {
    let localStorageMake: WindowStorageInterface;
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
      localStorageMake = windowStorageMakeWrapper(window.localStorage);
    });

    test('if the given not-object like value is storaged', () => {
      localStorageMake.setItem('a', 16);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('a', '16');
    });

    test('if the given object like value is storaged', () => {
      localStorageMake.setItem('a', { a: 2 });
      expect(localStorageMock.setItem).toHaveBeenCalledWith('a', JSON.stringify({ a: 2 }));
    });

    xtest('if an invalid value is not stored', () => {
      localStorageMake = windowStorageMakeWrapper(window.localStorage);
      localStorageMock.setItem('a', { nan: parseInt('not a number') });
    });
  });

  describe('getItem', () => {
    test('if it gets the value that belongs to the given key', () => {
      Object.defineProperty(window, 'localStorage', {
        value: mockWindowStorage(JSON.stringify({ a: 'b' })),
      });
      const localStorageMake = windowStorageMakeWrapper(window.localStorage);
      expect(localStorageMake.getItem('a')).toEqual({ a: 'b' });
    });

    it('should return a value if it is a number', () => {
      Object.defineProperty(window, 'localStorage', {
        value: mockWindowStorage(1),
      });
      const localStorageMake = windowStorageMakeWrapper(window.localStorage);
      expect(localStorageMake.getItem('a')).toEqual(1);
    });
  });

  describe('removeItem', () => {
    test('if value of the given key is removed', () => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
      const localStorageMake = windowStorageMakeWrapper(window.localStorage);
      localStorageMake.removeItem('a');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('a');
    });
  });

  describe('clear', () => {
    it('should clear the storage', () => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
      const localStorageMake = windowStorageMakeWrapper(window.localStorage);
      localStorageMake.clear();
      expect(localStorageMock.clear).toHaveBeenCalled();
    });
  });
});
