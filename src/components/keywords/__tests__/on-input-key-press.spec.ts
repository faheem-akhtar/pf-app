import { KeyboardEventMock } from 'mocks/keyboard-event/mock';
import { KeyboardKeyEnum } from 'enums/keyboard/key.enum';
import { keywordsOnInputKeyPress } from '../on-input-key-press';

describe('keywordsOnInputKeyPress', () => {
  it('should add item on enter and deactivate', () => {
    const addItemSpy = jest.fn();
    const deactivateSpy = jest.fn();
    keywordsOnInputKeyPress({
      inputValue: '1',
      addItem: addItemSpy,
      deactivate: deactivateSpy,
      clearInput: jest.fn,
      e: { ...KeyboardEventMock(), key: KeyboardKeyEnum.enter },
    });

    expect(addItemSpy).toHaveBeenCalledWith('1');
    expect(addItemSpy).toHaveBeenCalledTimes(1);
    expect(deactivateSpy).toHaveBeenCalledTimes(1);
  });

  const triggerKeys = [KeyboardKeyEnum.comma, KeyboardKeyEnum.commaArabic];

  triggerKeys.forEach((triggerKey) => {
    it(`should add item on ${triggerKey}, clear the input value and prevent default behavior of event`, () => {
      const addItemSpy = jest.fn();
      const deactivateSpy = jest.fn();
      const clearInputSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      keywordsOnInputKeyPress({
        inputValue: '1',
        addItem: addItemSpy,
        deactivate: deactivateSpy,
        clearInput: clearInputSpy,
        e: { ...KeyboardEventMock(), key: triggerKey, preventDefault: preventDefaultSpy },
      });

      expect(addItemSpy).toHaveBeenCalledWith('1');
      expect(addItemSpy).toHaveBeenCalledTimes(1);
      expect(clearInputSpy).toHaveBeenCalledTimes(1);
      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      expect(deactivateSpy).not.toHaveBeenCalled();
    });
  });
});
