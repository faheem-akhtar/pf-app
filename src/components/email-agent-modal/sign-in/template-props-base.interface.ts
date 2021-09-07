import { TFunctionType } from 'types/t-function/type';

export interface EmailAgentModalSignInTemplatePropsBaseInterface {
  /**
   * Called when the not now button clicked.
   */
  closeModal: () => void;

  /**
   * Translate function
   */
  t: TFunctionType;
}
