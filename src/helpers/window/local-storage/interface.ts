import { AnyValue } from 'types/value';

export interface WindowLocalStorageInterface {
  /**
   * Store @value identified by @key
   */
  setItem(key: string, value: AnyValue): void;

  /**
   * Returns the data identified by @key
   */
  getItem(key: string): AnyValue;

  /**
   * Removes the data identified by @key
   */
  removeItem(key: string): void;
}
