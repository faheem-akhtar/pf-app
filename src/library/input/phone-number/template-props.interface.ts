import { CountryPhoneCodesInterface } from 'types/country-phone-codes/interface';
import { InputBaseComponentPropsInterface } from '../base/component-props.interface';

export interface InputPhoneNumberTemplatePropsInterface extends InputBaseComponentPropsInterface {
  /**
   * Called when the toggle is clicked.
   */
  onClickToggle: () => void;

  /**
   * If `true`, the list is opened.
   * @default false
   */
  visible: boolean;

  /**
   * Ref to access an list element
   */
  rootRef: React.Ref<HTMLDivElement>;

  /**
   * If `true`, the component is focused.
   * @default false
   */
  focus: boolean;

  /**
   * List of country phone codes
   */
  countryList: CountryPhoneCodesInterface[];
}
