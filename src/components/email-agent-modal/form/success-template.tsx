import { IconThinCheckmarkCircleTemplate } from 'components/icon/thin/checkmark-circle-template';

import { EmailAgentModalSignInTemplate } from '../sign-in/template';
import { EmailAgentModalSignInTemplatePropsInterface } from '../sign-in/template-props.interface';

import styles from './email-agent-modal-form.module.scss';

export const EmailAgentModalFormSuccessTemplate = (props: EmailAgentModalSignInTemplatePropsInterface): JSX.Element => (
  <div className={styles.success}>
    <IconThinCheckmarkCircleTemplate class={styles.successIcon} />

    <div className={styles.successContent}>
      <p>{props.t('thank-you')}</p>
      <p>{props.t('agent-modal/email-sending-message-text')}</p>
    </div>

    <EmailAgentModalSignInTemplate {...props} />
  </div>
);
