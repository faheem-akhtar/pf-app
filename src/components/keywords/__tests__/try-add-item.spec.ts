import { MultiSelectionAutocompleteExtensionInterface } from 'library/multi-selection-autocomplete/extension.interface';

import { keywordsTryAddItem } from '../try-add-item';

describe('keywordsTryAddItem', () => {
  it('should add item when the value is not empty', () => {
    const addItemSpy = jest.fn();
    keywordsTryAddItem({
      inputValue: '1',
      addItem: addItemSpy,
    } as unknown as MultiSelectionAutocompleteExtensionInterface<string>);

    expect(addItemSpy).toHaveBeenCalledWith('1');
    expect(addItemSpy).toHaveBeenCalledTimes(1);
  });
  it('should not add item when the value is empty', () => {
    const addItemSpy = jest.fn();
    keywordsTryAddItem({
      inputValue: '         ',
      addItem: addItemSpy,
    } as unknown as MultiSelectionAutocompleteExtensionInterface<string>);

    expect(addItemSpy).not.toHaveBeenCalled();
  });
});
