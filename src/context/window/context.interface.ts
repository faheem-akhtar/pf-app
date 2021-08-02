import { WindowLocalStorageInterface } from './local-storage/interface';

/**
 * Use this context to access any window interface you may need.
 * Required to enable window dependency mocking for testing purposes
 */
export interface WindowContextInterface {
  /**
   * Local storage flavored interface that supports complex objects serialization and deserialization
   */
  localStorage: WindowLocalStorageInterface;
}
