import { AnyValueType } from 'types/any/value.type';

export interface WindowStorageInterface {
  /**
   * Store @value identified by @key
   */
  setItem(key: string, value: AnyValueType): void;

  /**
   * Returns the data identified by @key
   */
  getItem(key: string): AnyValueType;

  /**
   * Removes the data identified by @key
   */
  removeItem(key: string): void;

  /**
   * Remove all saved data
   */
  clear(): void;
}
