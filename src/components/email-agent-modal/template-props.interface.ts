import { EmailAgentModalFormTemplatePropsInterface } from './form/template-props.interface';
import { EmailAgentModalSignInComponentPropsInterface } from './sign-in/component-props.interface';

export interface EmailAgentModalTemplatePropsInterface
  extends EmailAgentModalSignInComponentPropsInterface,
    EmailAgentModalFormTemplatePropsInterface {
  /**
   * The property name
   */
  propertyName: string;

  /**
   * General error return from API
   */
  error: string;

  /**
   * Called when the close icon clicked.
   */
  closeModal: () => void;

  /**
   * Status
   */
  status: 'opened' | 'submitting' | 'submitted';
}
