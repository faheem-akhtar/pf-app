export interface MultiSelectionAutocompleteInactiveRenderValueInterface<T> {
  /**
   * Title
   */
  title: string;
  /**
   * Item
   */
  item: T;
  /**
   * Whether or not this item is "N more" item
   */
  isMore?: true;
}
