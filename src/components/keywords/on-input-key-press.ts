import { KeyboardKeyEnum } from 'enums/keyboard/key.enum';
import { MultiSelectionAutocompleteInputKeyPressExtensionPropsInterface } from 'library/multi-selection-autocomplete/input-key-press-extension-props.interface';

import { keywordsTryAddItem } from './try-add-item';

export const keywordsOnInputKeyPress = (
  props: MultiSelectionAutocompleteInputKeyPressExtensionPropsInterface<string>
): void => {
  if (props.e.key === KeyboardKeyEnum.enter) {
    keywordsTryAddItem(props);
    props.deactivate();
  }
  if (props.e.key === KeyboardKeyEnum.comma || props.e.key === KeyboardKeyEnum.commaArabic) {
    keywordsTryAddItem(props);
    props.clearInput();
    props.e.preventDefault();
  }
};
