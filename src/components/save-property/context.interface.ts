export interface SavePropertyContextInterface {
  /**
   * Array of saved properties ids
   */
  propertyIds: number[];

  /**
   * Made the property saved or unsaved
   */
  toggle: (propertyId: string) => void;
}
