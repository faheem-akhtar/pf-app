import { configLinksSecondaryTermsConditions } from 'config/links/secondary/terms-conditions';
import { CheckboxTemplate } from 'library/checkbox/template';

import styles from '../email-agent-modal-form.module.scss';
import { EmailAgentModalFormFieldTemplate } from '../field-template';
import { EmailAgentModalFormWidgetPropsType } from './props.type';

export const EmailAgentModalFormWidgetAcceptTermsComponent: React.FunctionComponent<
  EmailAgentModalFormWidgetPropsType<boolean>
> = ({ value, onChange, t }): JSX.Element => (
  <EmailAgentModalFormFieldTemplate>
    <CheckboxTemplate
      id='accept-terms'
      checked={value}
      onChange={(e): void => {
        const target = e.target as HTMLInputElement;
        onChange(target.checked);
      }}
    >
      {t('agent-modal/accept-terms-message-prefix')}
      <a href={t(configLinksSecondaryTermsConditions.target)} target='_blank' rel='noreferrer' className={styles.link}>
        {t('agent-modal/accept-terms-message-link')}
      </a>
      {t('agent-modal/accept-terms-message-suffix')}
    </CheckboxTemplate>
  </EmailAgentModalFormFieldTemplate>
);
