export interface MultiSelectionAutocompleteExtensionInterface<T> {
  /**
   * Add item and deactivate callback
   */
  addItem: (item: T) => void;
  /**
   * Deactivate the widget
   */
  deactivate: () => void;
  /**
   * Clear input value
   */
  clearInput: () => void;
  /**
   * Current input value
   */
  inputValue: string;
}
