import { useEffect, useRef, useState } from 'react';

import { multiSelectionAutocompleteMakeKeyboardAccessibilityHandler } from './make-keyboard-accessibility-handler';
import { useWindowMouseDownHook } from 'helpers/hook/window-mouse-down.hook';

import { KeyboardKeyEnum } from 'enums/keyboard/key.enum';
import { MultiSelectionAutocompleteComponentPropsInterface } from './component-props.interface';
import { MultiSelectionAutocompleteExtensionInterface } from './extension.interface';
import { MultiSelectionAutocompleteTemplate } from './template';

// TODO-FE[TPNX-1968] Test MultiSelectionAutocompleteComponent

export const MultiSelectionAutocompleteComponent = <T extends unknown>(
  props: MultiSelectionAutocompleteComponentPropsInterface<T>
): JSX.Element => {
  /* Refs */
  const rootRef = useRef(null);
  // It is used to keep focus inside the component while navigating up and down with arrows
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* State */
  const [isActive, setIsActive] = useState(false);
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [inputValue, setInputValueInternal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const setInputValue = (value: string): void => {
    setInputValueInternal(value);
    if (props.onInputValueChange) {
      props.onInputValueChange(value);
    }
  };

  /* Helpers */
  const addInputFocus = (): void => {
    inputRef.current?.select();
  };

  /**
   * Removes the focus from input and keeps the hidden input focused,
   * so the keydown event can be received by the root component
   */
  const removeInputFocus = (): void => {
    hiddenInputRef.current?.focus();
    inputRef.current?.blur();
  };

  /**
   * Deactivate the component
   */
  const deactivate = (): void => {
    setIsActive(false);
    setInputValue('');
    setSelectedItemIndex(null);
    removeInputFocus();
    setSuggestions([]);
  };

  /**
   * Handle suggestions promise
   * @param promise will eventually return suggestions
   */
  const handleSuggestionsResult = (promise: Promise<T[]>): void => {
    setIsLoading(true);

    promise
      .then(setSuggestions)
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(`MultiSelectionAutocompleteComponent.handleSuggestionsResult promise error`, e);
      })
      .then(() => setIsLoading(false));
  };

  /**
   * Add item and deactivate
   * @param item
   */
  const addItemAndDeactivate = (item: T): void => {
    deactivate();
    props.onAddItem(item);
  };

  /**
   * Handle input value change
   */
  const handleInputChange = (value: string): void => {
    setInputValue(value);
    handleSuggestionsResult(props.onInputChange(value));
  };

  /**
   * On input keydown
   * @param e KeyboardEvent
   */
  const onInputKeyDown = (e: KeyboardEvent): void => {
    // deactivate widget if user pressed tab during input is in focus
    if (e.key === KeyboardKeyEnum.tab) {
      deactivate();
    }
  };

  /**
   * On suggestion click
   * @param item
   */
  const suggestionOnClick = (item: T): void => {
    deactivate();
    props.onAddItem(item);
  };

  const extensionInterfaceProps: MultiSelectionAutocompleteExtensionInterface<T> = {
    addItem: props.onAddItem,
    deactivate,
    clearInput: () => handleInputChange(''),
    inputValue,
  };

  /* Effects */
  // deactivate on windows mouse down outside of component
  useWindowMouseDownHook({
    shouldListen: isActive,
    ignoreElementRef: rootRef,
    onWindowMouseDown: (e) => {
      if (props.onWindowMouseDownOutsideAutocomplete) {
        props.onWindowMouseDownOutsideAutocomplete({ e, ...extensionInterfaceProps });
      }
      deactivate();
    },
  });

  // focus input when component becomes active
  useEffect(() => {
    isActive && addInputFocus();
  }, [isActive]);

  return (
    <MultiSelectionAutocompleteTemplate
      chipsOnTheBottom={props.chipsOnTheBottom}
      className={props.className}
      chipClassName={props.chipClassName}
      value={props.value}
      placeholder={props.placeholder}
      onItemCrossClick={(item, isMore): void => (isMore ? props.onItemGroupRemoveClick() : props.onItemRemove(item))}
      getTitle={props.getTitle}
      getChipTitle={props.getChipTitle}
      renderNoSuggestions={props.renderNoSuggestions}
      suggestionIcon={props.suggestionIcon}
      isLoading={isLoading}
      isActive={isActive}
      inputRef={inputRef}
      inputValue={inputValue}
      onInputChange={(): void => handleInputChange(inputRef?.current?.value || '')}
      onInputKeyDown={onInputKeyDown}
      onInputCrossButtonClick={deactivate}
      suggestions={suggestions}
      selectedItemIndex={selectedItemIndex}
      suggestionOnClick={suggestionOnClick}
      rootRef={rootRef}
      hiddenInputRef={hiddenInputRef}
      onInputFocus={(): void => {
        setSelectedItemIndex(null);
        handleSuggestionsResult(props.onFocus(inputValue));
      }}
      onInputKeyPress={(e: KeyboardEvent): void =>
        props.onInputKeyPress && props.onInputKeyPress({ e, ...extensionInterfaceProps })
      }
      onRootClick={(): void => {
        if (!isActive) {
          setIsActive(true);
        }
      }}
      onRootKeyDown={multiSelectionAutocompleteMakeKeyboardAccessibilityHandler({
        selectedItemIndex,
        suggestions,
        removeInputFocus,
        addInputFocus,
        deactivate,
        setSelectedItemIndex,
        addItemAndDeactivate,
      })}
    />
  );
};
