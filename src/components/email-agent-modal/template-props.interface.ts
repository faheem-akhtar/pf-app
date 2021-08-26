import { EmailAgentModalFormTemplatePropsInterface } from './form/template-props.interface';
import { EmailAgentModalSignInTemplatePropsInterface } from './sign-in/template-props.interface';

export interface EmailAgentModalTemplatePropsInterface
  extends EmailAgentModalSignInTemplatePropsInterface,
    EmailAgentModalFormTemplatePropsInterface {
  /**
   * The property name
   */
  propertyName: string;

  /**
   * General error return from API
   */
  error?: string;

  /**
   * Called when the close icon clicked.
   */
  onCloseButtonClick: () => void;

  /**
   * Status
   */
  status: 'opened' | 'submitting' | 'submitted';
}
