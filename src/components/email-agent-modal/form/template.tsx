import { configEmailAgentMustAcceptTerms } from 'config/email-agent/must-accept-terms';
import { configEmailAgentReceiveAdsEnabled } from 'config/email-agent/receive-ads-enabled';

import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';
import { EmailAgentModalFormTemplatePropsInterface } from './template-props.interface';
import { EmailAgentModalFormWidgetAcceptTermsComponent } from './widget/accept-terms-component';
import { EmailAgentModalFormWidgetEmailAlertComponent } from './widget/email-alert-component';
import { EmailAgentModalFormWidgetEmailComponent } from './widget/email-component';
import { EmailAgentModalFormWidgetMessageComponent } from './widget/message-component';
import { EmailAgentModalFormWidgetNameComponent } from './widget/name-component';
import { EmailAgentModalFormWidgetPhoneComponent } from './widget/phone-component';
import { EmailAgentModalFormWidgetReceiveAdvertisingComponent } from './widget/receive-advertising-component';

import styles from './email-agent-modal-form.module.scss';

export const EmailAgentModalFormTemplate = ({
  fieldsValue,
  setFieldsValue,
  onSubmit,
  t,
}: EmailAgentModalFormTemplatePropsInterface): JSX.Element => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <EmailAgentModalFormWidgetNameComponent
        t={t}
        value={fieldsValue.name}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, name: newValue })}
      />
      <EmailAgentModalFormWidgetEmailComponent
        t={t}
        value={fieldsValue.email}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, email: newValue })}
      />
      <EmailAgentModalFormWidgetPhoneComponent
        t={t}
        value={fieldsValue.phone}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, phone: newValue })}
      />
      <EmailAgentModalFormWidgetMessageComponent
        t={t}
        value={fieldsValue.message}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, message: newValue })}
      />
      <EmailAgentModalFormWidgetEmailAlertComponent
        t={t}
        value={fieldsValue.emailAlert}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, emailAlert: newValue })}
      />
      {configEmailAgentMustAcceptTerms && (
        <EmailAgentModalFormWidgetAcceptTermsComponent
          t={t}
          value={fieldsValue.acceptTerms}
          onChange={(newValue): void => setFieldsValue({ ...fieldsValue, acceptTerms: newValue })}
        />
      )}
      {configEmailAgentReceiveAdsEnabled && (
        <EmailAgentModalFormWidgetReceiveAdvertisingComponent
          t={t}
          value={fieldsValue.receiveAdvertising}
          onChange={(newValue): void => setFieldsValue({ ...fieldsValue, receiveAdvertising: newValue })}
        />
      )}

      <ButtonTemplate
        type='submit'
        size={ButtonSizeEnum.regular}
        componentType={ButtonComponentTypeEnum.primary}
        className={styles.button}
      >
        {t('agent-modal/cta-send-message')}
      </ButtonTemplate>
    </form>
  );
};
