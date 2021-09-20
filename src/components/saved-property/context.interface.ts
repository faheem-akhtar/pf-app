import { SavedPropertyInterface } from './interface';

export interface SavedPropertyContextInterface {
  /**
   * Array of saved properties ids
   */
  data: SavedPropertyInterface[];

  /**
   * Made the property saved or unsaved
   */
  toggle: (propertyId: string) => void;
}
