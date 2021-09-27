import { EmailAgentModalFormSuccessComponentPropsInterface } from '../form/success-component-props.interface';

export interface EmailAgentModalSignInTemplatePropsInterface
  extends Pick<EmailAgentModalFormSuccessComponentPropsInterface, 'openAuthRef' | 'closeModal' | 't'> {}
