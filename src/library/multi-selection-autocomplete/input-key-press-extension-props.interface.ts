import { MultiSelectionAutocompleteExtensionInterface } from './extension.interface';

export interface MultiSelectionAutocompleteInputKeyPressExtensionPropsInterface<T>
  extends MultiSelectionAutocompleteExtensionInterface<T> {
  /**
   * Keyboard event
   */
  e: KeyboardEvent;
}
