import { InputBaseComponent } from 'library/input/base/component';

import { EmailAgentModalFormFieldTemplate } from '../field-template';
import { EmailAgentModalFormWidgetPropsType } from './props.type';

export const EmailAgentModalFormWidgetEmailComponent: React.FunctionComponent<
  EmailAgentModalFormWidgetPropsType<string>
> = ({ onChange, value, error, t }): JSX.Element => (
  <EmailAgentModalFormFieldTemplate>
    <InputBaseComponent
      id='email'
      name='email'
      onChange={onChange}
      value={value}
      placeholder={t('email')}
      type='email'
      errorText={error}
    />
  </EmailAgentModalFormFieldTemplate>
);
