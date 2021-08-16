export interface MultiSelectionAutocompleteTemplatePropsInterface<T> {
  /**
   * Current value of autocomplete - array of items
   */
  value: T[];
  /**
   * Weather suggestion are being loaded at the moment
   */
  isLoading: boolean;
  /**
   * Input value
   */
  inputValue: string;
  /**
   * Placeholder
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
   * On input change
   */
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * On input focus
   */
  onInputFocus: () => void;
  /**
   * On input key down
   */
  onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * On input key press
   */
  onInputKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * suggestion icon
   */
  suggestionIcon?: JSX.Element;
  /**
   * Reference to root element
   */
  rootRef: React.Ref<HTMLDivElement>;
  /**
   * Reference to input element
   */
  inputRef: React.Ref<HTMLInputElement>;
  /**
   * Reference to hidden input element
   */
  hiddenInputRef: React.Ref<HTMLInputElement>;
  /**
   * Whether component is active
   */
  isActive: boolean;
  /**
   * On item cross button clicked
   */
  onItemCrossClick: (item: T, isMore?: boolean) => void;
  /**
   * On input cross button click
   */
  onInputCrossButtonClick: () => void;
  /**
   * Get item title
   */
  getTitle: (item: T) => string;
  /**
   * Get chip title
   */
  getChipTitle: (item: T) => string;
  /**
   * Suggestions
   */
  suggestions: T[];
  /**
   * Render function for "no suggestions available" case
   */
  renderNoSuggestions: (inputValue: string) => JSX.Element;
  /**
   * Selected item
   */
  selectedItemIndex: number | null;
  /**
   * Suggestion on click
   */
  suggestionOnClick: (item: T) => void;
  /**
   * On root element click
   */
  onRootClick: () => void;
  /**
   * On root key down
   */
  onRootKeyDown: (e: React.KeyboardEvent) => void;
}
