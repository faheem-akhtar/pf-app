import { TFunctionType } from 'types/t-function/type';
export interface EmailAgentModalSignInTemplatePropsInterface {
  /**
   * Called when the sign in button clicked.
   */
  onClickSignIn: () => void;

  /**
   * Called when the not now button clicked.
   */
  onClickNotNow: () => void;

  /**
   * Translate function
   */
  t: TFunctionType;
}
