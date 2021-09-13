import { IconThinCheckmarkCircleTemplate } from 'components/icon/thin/checkmark-circle-template';

import { EmailAgentModalSignInComponent } from '../sign-in/component';
import { EmailAgentModalSignInComponentPropsInterface } from '../sign-in/component-props.interface';
import styles from './email-agent-modal-form.module.scss';

export const EmailAgentModalFormSuccessTemplate = (
  props: EmailAgentModalSignInComponentPropsInterface
): JSX.Element => (
  <div className={styles.success}>
    <IconThinCheckmarkCircleTemplate class={styles.successIcon} />

    <div className={styles.successContent}>
      <p>{props.t('thank-you')}</p>
      <p>{props.t('your-message-is-sent')}</p>
    </div>

    <EmailAgentModalSignInComponent {...props} />
  </div>
);
