export interface MultiSelectionAutocompleteMakeKeyboardAccesibilityHandlerPropsInterface<T> {
  /**
   * Currently selected item index
   */
  selectedItemIndex: number | null;
  /**
   * Available suggestions list
   */
  suggestions: T[];
  /**
   * Remove focus from input component
   */
  removeInputFocus: () => void;
  /**
   * Put focus into input component
   */
  addInputFocus: () => void;
  /**
   * Deactivate component
   */
  deactivate: () => void;
  /**
   * Set component item index
   */
  setSelectedItemIndex: (index: number | null) => void;
  /**
   * Add new item and deactivate
   */
  addItemAndDeactivate: (item: T) => void;
}
