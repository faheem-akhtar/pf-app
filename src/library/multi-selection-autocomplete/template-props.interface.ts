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
  onInputChange: (e: Event) => void;
  /**
   * On input focus
   */
  onInputFocus: () => void;
  /**
   * On input key down
   */
  onInputKeyDown: (e: KeyboardEvent) => void;
  /**
   * On input key press
   */
  onInputKeyPress: (e: KeyboardEvent) => void;
  /**
   * suggestion icon
   */
  suggestionIcon?: preact.JSX.Element;
  /**
   * Reference to root element
   */
  rootRef: preact.Ref<HTMLDivElement>;
  /**
   * Reference to input element
   */
  inputRef: preact.Ref<HTMLInputElement>;
  /**
   * Reference to hidden input element
   */
  hiddenInputRef: preact.Ref<HTMLInputElement>;
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
  renderNoSuggestions: (inputValue: string) => preact.JSX.Element;
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
  onRootKeyDown: (e: KeyboardEvent) => void;
}
