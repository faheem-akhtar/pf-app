import { TFunctionType } from 'types/t-function/type';

export interface MultiSelectionAutocompleteComputeInactiveRenderValuePropsInterface<T> {
  /**
   * Translate fn
   */
  t: TFunctionType;
  /**
   * MultiSelectionAutocomplete component value
   */
  value: T[];
  /**
   * Get title from item
   */
  getChipTitle: (item: T) => string;
}
