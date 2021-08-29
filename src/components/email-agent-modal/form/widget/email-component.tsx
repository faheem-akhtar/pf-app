import { EmailAgentModalFormFieldTemplate } from '../field-template';
import { EmailAgentModalFormWidgetPropsType } from './props.type';
import { InputBaseComponent } from 'library/input/base/component';

export const EmailAgentModalFormWidgetEmailComponent: React.FunctionComponent<
  EmailAgentModalFormWidgetPropsType<string>
> = ({ onChange, value, t }): JSX.Element => (
  <EmailAgentModalFormFieldTemplate>
    <InputBaseComponent onChange={onChange} value={value} placeholder={t('email')} type='email' />
  </EmailAgentModalFormFieldTemplate>
);