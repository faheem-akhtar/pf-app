import { TFunctionType } from 'types/t-function/type';

export interface EmailAgentModalSignInTemplatePropsBaseInterface {
  /**
   * A ref to access auth pop-up
   */
  openAuthRef: React.MutableRefObject<() => void>;

  /**
   * Called when the not now button clicked.
   */
  closeModal: () => void;

  /**
   * Translate function
   */
  t: TFunctionType;
}
