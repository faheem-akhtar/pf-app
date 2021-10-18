import { InputPhoneNumberComponent } from 'library/input/phone-number/component';

import { EmailAgentModalFormFieldTemplate } from '../field-template';
import { EmailAgentModalFormWidgetPropsType } from './props.type';

export const EmailAgentModalFormWidgetPhoneComponent: React.FunctionComponent<
  EmailAgentModalFormWidgetPropsType<string>
> = ({ onChange, value, error, t }): JSX.Element => (
  <EmailAgentModalFormFieldTemplate>
    <InputPhoneNumberComponent
      id='phone-number'
      name='phone'
      onChange={onChange}
      value={value}
      placeholder={t('phone')}
      errorText={error}
    />
  </EmailAgentModalFormFieldTemplate>
);
