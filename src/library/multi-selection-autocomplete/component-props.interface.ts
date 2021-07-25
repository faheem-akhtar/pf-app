import { MultiSelectionAutocompleteInputKeyPressExtensionPropsInterface } from './input-key-press-extension-props.interface';
import { MultiSelectionAutocompleteMouseDownExtensionPropsInterface } from './mouse-down-extension-props.interface';

/**
 * Generic multi selection autocomplete component props interface
 */
export interface MultiSelectionAutocompleteComponentPropsInterface<T> {
  /**
   * Current value of autocomplete - array of items
   */
  value: T[];
  /**
   * Title selector for an item
   */
  getTitle: (item: T) => string;
  /**
   * Get chip title
   */
  getChipTitle: (item: T) => string;
  /**
   * Input placeholder
   */
  placeholder: string;
  /**
   * additional css classes for component
   */
  className?: string;
  /**
   * additional css classes for chips
   */
  chipClassName?: string;
  /**
   * If true, the chips will be rendered on the bottom of the input, otherwise inside the input
   */
  chipsOnTheBottom?: true;
  /**
   * On remove item callback (Triggers on individual chip item cross click)
   */
  onItemRemove: (item: T) => void;
  /**
   * On remove more items (Triggers on more chip cross icon click)
   */
  onItemGroupRemoveClick: () => void;
  /**
   * On input change callback, should return a promise of suggestions
   */
  onInputChange: (value: string) => Promise<T[]>;
  /**
   * On focus callback, should return a promise of suggestions
   */
  onFocus: (value: string) => Promise<T[]>;
  /**
   * On add item callback (Triggers when suggestion is clicked or selected+enter pressed)
   */
  onAddItem: (item: T) => void;
  /**
   * Render function for "no suggestions available" case
   */
  renderNoSuggestions: (inputValue: string) => preact.JSX.Element;
  /**
   * Callback for input key press (You can add custom addItem logic here (on enter key for example))
   */
  onInputKeyPress?: (props: MultiSelectionAutocompleteInputKeyPressExtensionPropsInterface<T>) => void;
  /**
   * Suggestion icon
   */
  suggestionIcon?: preact.JSX.Element;
  /**
   * On window mouse down outside autocomplete component
   */
  onWindowMouseDownOutsideAutocomplete?: (props: MultiSelectionAutocompleteMouseDownExtensionPropsInterface<T>) => void;
  /**
   * On input value change
   */
  onInputValueChange?: (inputValue: string) => void;
}
