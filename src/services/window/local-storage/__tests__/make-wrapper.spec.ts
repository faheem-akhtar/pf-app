import { mockWindowLocalStorage } from 'mocks/window/local-storage.mock';

import { WindowLocalStorageInterface } from '../interface';
import { windowLocalStorageMakeWrapper } from '../make-wrapper';

describe('windowLocalStorageMakeWrapper', () => {
  let localStorageMock: WindowLocalStorageInterface;
  beforeEach(() => {
    localStorageMock = mockWindowLocalStorage();
  });

  it('should have default localStorage state for unsupported browsers', () => {
    Object.defineProperty(window, 'localStorage', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    const localStorageMake = windowLocalStorageMakeWrapper(window);
    expect(localStorageMake.setItem('a', 1)).toBeNull();
    expect(localStorageMake.getItem('a')).toBeNull();
    expect(localStorageMake.removeItem('a')).toBeNull();
  });

  it('should have the given localStorage state for supported browsers', () => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    const localStorageMake = windowLocalStorageMakeWrapper(window);
    expect(localStorageMake.setItem('a', 3)).not.toBeNull();
  });

  describe('setItem', () => {
    let localStorageMake: WindowLocalStorageInterface;
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
      localStorageMake = windowLocalStorageMakeWrapper(window);
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
      localStorageMake = windowLocalStorageMakeWrapper(window);
      localStorageMock.setItem('a', { nan: parseInt('not a number') });
    });
  });

  describe('getItem', () => {
    test('if it gets the value that belongs to the given key', () => {
      Object.defineProperty(window, 'localStorage', {
        value: mockWindowLocalStorage(JSON.stringify({ a: 'b' })),
      });
      const localStorageMake = windowLocalStorageMakeWrapper(window);
      expect(localStorageMake.getItem('a')).toEqual({ a: 'b' });
    });
  });

  describe('removeItem', () => {
    test('if value of the given key is removed', () => {
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
      const localStorageMake = windowLocalStorageMakeWrapper(window);
      localStorageMake.removeItem('a');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('a');
    });
  });
});
