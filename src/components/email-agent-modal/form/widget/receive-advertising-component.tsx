import { CheckboxTemplate } from 'library/checkbox/template';
import { EmailAgentModalFormAcceptConditionsErrorMessageTemplate } from '../accept-conditions-error-message-template';
import { EmailAgentModalFormFieldTemplate } from '../field-template';
import { EmailAgentModalFormWidgetPropsType } from './props.type';

export const EmailAgentModalFormWidgetReceiveAdvertisingComponent: React.FunctionComponent<
  EmailAgentModalFormWidgetPropsType<boolean>
> = ({ value, onChange, error, t }): JSX.Element => (
  <EmailAgentModalFormFieldTemplate>
    {error && <EmailAgentModalFormAcceptConditionsErrorMessageTemplate t={t} />}
    <CheckboxTemplate
      id='receive-advertising'
      checked={value}
      onChange={(e): void => {
        const target = e.target as HTMLInputElement;
        onChange(target.checked);
      }}
    >
      {t('agent-modal/receive-advertising-message')}
    </CheckboxTemplate>
  </EmailAgentModalFormFieldTemplate>
);
