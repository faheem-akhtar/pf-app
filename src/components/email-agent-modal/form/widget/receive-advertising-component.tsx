import { CheckboxTemplate } from 'library/checkbox/template';

import { EmailAgentModalFormFieldTemplate } from '../field-template';
import { EmailAgentModalFormWidgetPropsType } from './props.type';

export const EmailAgentModalFormWidgetReceiveAdvertisingComponent: React.FunctionComponent<
  EmailAgentModalFormWidgetPropsType<boolean>
> = ({ value, onChange, t }): JSX.Element => (
  <EmailAgentModalFormFieldTemplate>
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
