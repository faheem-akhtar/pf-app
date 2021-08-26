import { CheckboxTemplate } from 'library/checkbox/template';
import { EmailAgentModalFormAcceptConditionsErrorMessageTemplate } from '../accept-conditions-error-message-template';
import { EmailAgentModalFormFieldTemplate } from '../field-template';
import { EmailAgentModalFormWidgetPropsType } from './props.type';

import styles from '../email-agent-modal-form.module.scss';

// TODO: Implement termsUrl config
export const EmailAgentModalFormWidgetAcceptTermsComponent: React.FunctionComponent<
  EmailAgentModalFormWidgetPropsType<boolean>
> = ({ value, onChange, error, t }): JSX.Element => (
  <EmailAgentModalFormFieldTemplate>
    {error && <EmailAgentModalFormAcceptConditionsErrorMessageTemplate t={t} />}
    <CheckboxTemplate
      id='accept-terms'
      checked={value}
      onChange={(e): void => {
        const target = e.target as HTMLInputElement;
        onChange(target.checked);
      }}
    >
      {t('agent-modal/accept-terms-message-prefix')}
      <a href='#' target='_blank' className={styles.link}>
        {t('agent-modal/accept-terms-message-link')}
      </a>
      {t('agent-modal/accept-terms-message-suffix')}
    </CheckboxTemplate>
  </EmailAgentModalFormFieldTemplate>
);
