import { KeyboardKeyEnum } from 'enums/keyboard/key.enum';
import { MultiSelectionAutocompleteMakeKeyboardAccesibilityHandlerPropsInterface } from './make-keyboard-accesibility-handler-props.interface';

/**
 * Handler to enable UpArrow, DownArrow and Enter functionality on autocomplete component
 * @param props
 */
export const multiSelectionAutocompleteMakeKeyboardAccessibilityHandler =
  <T extends unknown>(
    props: MultiSelectionAutocompleteMakeKeyboardAccesibilityHandlerPropsInterface<T>
  ): React.KeyboardEventHandler<Element> =>
  (e): void => {
    if (e.key === KeyboardKeyEnum.down) {
      let nextIndex;
      switch (props.selectedItemIndex) {
        case null:
          nextIndex = 0;
          props.removeInputFocus();
          break;
        case props.suggestions.length - 1:
          return;
        default:
          nextIndex = props.selectedItemIndex + 1;
          break;
      }
      props.setSelectedItemIndex(nextIndex);
    } else if (e.key === KeyboardKeyEnum.up) {
      let nextIndex;
      switch (props.selectedItemIndex) {
        case null:
          return;
        case 0:
          nextIndex = null;
          props.addInputFocus();
          break;
        default:
          nextIndex = props.selectedItemIndex - 1;
      }
      props.setSelectedItemIndex(nextIndex);
    } else if (e.key === KeyboardKeyEnum.enter) {
      if (props.selectedItemIndex !== null) {
        props.addItemAndDeactivate(props.suggestions[props.selectedItemIndex]);
        props.deactivate();
      }
    }
  };
