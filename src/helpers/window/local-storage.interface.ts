import { AnyValue } from 'types/value';

export interface WindowLocalStorageInterface {
  /**
   * Store @value identified by @key
   */
  setItem(key: string, value: AnyValue): void;

  /**
   * Returns the data identified by @key
   */
  getItem<R>(key: string): R | null;

  /**
   * Removes the data identified by @key
   */
  removeItem(key: string): void;
}
