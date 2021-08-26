import { EmailAgentModalFormFieldTemplate } from '../field-template';
import { EmailAgentModalFormWidgetPropsType } from './props.type';
import { InputPhoneNumberComponent } from 'library/input/phone-number/component';

export const EmailAgentModalFormWidgetPhoneComponent: React.FunctionComponent<
  EmailAgentModalFormWidgetPropsType<string>
> = ({ onChange, value, t }): JSX.Element => (
  <EmailAgentModalFormFieldTemplate>
    <InputPhoneNumberComponent onChange={onChange} value={value} placeholder={t('phone')} />
  </EmailAgentModalFormFieldTemplate>
);
