import { IconThinCheckmarkCircleTemplate } from 'components/icon/thin/checkmark-circle-template';
import { MortgageCampaignComponent } from 'components/mortgage/campaign/component';
import { mortgageCampaignEnabled } from 'config/mortgage/campaign-enabled';

import { EmailAgentModalSignInTemplate } from '../sign-in/template';
import styles from './email-agent-modal-form.module.scss';
import { EmailAgentModalFormSuccessComponentPropsInterface } from './success-component-props.interface';

export const EmailAgentModalFormSuccessComponent = ({
  user,
  fieldsValue,
  property,
  ...props
}: EmailAgentModalFormSuccessComponentPropsInterface): JSX.Element => {
  const body = user ? (
    mortgageCampaignEnabled && <MortgageCampaignComponent property={property} leadModel={fieldsValue} />
  ) : (
    <EmailAgentModalSignInTemplate {...props} />
  );

  return (
    <div className={styles.success}>
      <IconThinCheckmarkCircleTemplate class={styles.successIcon} />

      <div className={styles.successContent}>
        <p>{props.t('thank-you')}</p>
        <p>{props.t('your-message-is-sent')}</p>
      </div>
      {body}
    </div>
  );
};
