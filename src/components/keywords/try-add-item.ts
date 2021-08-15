import { MultiSelectionAutocompleteExtensionInterface } from 'library/multi-selection-autocomplete/extension.interface';

export const keywordsTryAddItem = (props: MultiSelectionAutocompleteExtensionInterface<string>): void => {
  const inputValueNoSpace = props.inputValue.replace(/\s/g, '');
  if (inputValueNoSpace.length) {
    props.addItem(props.inputValue);
  }
};
