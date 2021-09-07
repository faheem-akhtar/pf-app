import { EmailAgentModalSignInTemplatePropsBaseInterface } from './template-props-base.interface';

export interface EmailAgentModalSignInTemplatePropsInterface extends EmailAgentModalSignInTemplatePropsBaseInterface {
  /**
   * A ref to access an element
   */
  openAuthRef: React.MutableRefObject<() => void>;

  /**
   * A ref to access an element
   */
  closeAuthRef: React.MutableRefObject<() => void>;
}
