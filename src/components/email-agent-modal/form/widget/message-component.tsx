import { EmailAgentModalFormFieldTemplate } from '../field-template';
import { EmailAgentModalFormWidgetPropsType } from './props.type';
import { InputBaseComponent } from 'library/input/base/component';

export const EmailAgentModalFormWidgetMessageComponent: React.FunctionComponent<
  EmailAgentModalFormWidgetPropsType<string>
> = ({ onChange, value, error, t }): JSX.Element => (
  <EmailAgentModalFormFieldTemplate>
    <InputBaseComponent
      onChange={onChange}
      value={value}
      placeholder={t('message')}
      textarea
      error={!!error}
      errorText={error}
    />
  </EmailAgentModalFormFieldTemplate>
);
