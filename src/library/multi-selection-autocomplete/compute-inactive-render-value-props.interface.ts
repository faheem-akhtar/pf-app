import { TFunction } from 'next-i18next';

export interface MultiSelectionAutocompleteComputeInactiveRenderValuePropsInterface<T> {
  /**
   * Translate fn
   */
  t: TFunction;
  /**
   * MultiSelectionAutocomplete component value
   */
  value: T[];
  /**
   * Get title from item
   */
  getChipTitle: (item: T) => string;
}
