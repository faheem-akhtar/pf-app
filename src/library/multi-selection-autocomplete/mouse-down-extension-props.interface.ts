import { MultiSelectionAutocompleteExtensionInterface } from './extension.interface';

export interface MultiSelectionAutocompleteMouseDownExtensionPropsInterface<T>
  extends MultiSelectionAutocompleteExtensionInterface<T> {
  /**
   * Mouse down event
   */
  e: MouseEvent;
}
