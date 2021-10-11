import { configEmailAgentMustAcceptTerms } from 'config/email-agent/must-accept-terms';
import { configEmailAgentReceiveAdsEnabled } from 'config/email-agent/receive-ads-enabled';
import { ButtonComponentTypeEnum } from 'library/button/component-type.enum';
import { ButtonSizeEnum } from 'library/button/size.enum';
import { ButtonTemplate } from 'library/button/template';

import { EmailAgentModalFormAcceptConditionsErrorMessageTemplate } from './accept-conditions-error-message-template';
import { EmailAgentModalFormComponentPropsInterface } from './component-props.interface';
import styles from './email-agent-modal-form.module.scss';
import { FormFieldsEnum } from './fields.enum';
import { EmailAgentModalFormWidgetAcceptTermsComponent } from './widget/accept-terms-component';
import { EmailAgentModalFormWidgetEmailAlertComponent } from './widget/email-alert-component';
import { EmailAgentModalFormWidgetEmailComponent } from './widget/email-component';
import { EmailAgentModalFormWidgetMessageComponent } from './widget/message-component';
import { EmailAgentModalFormWidgetNameComponent } from './widget/name-component';
import { EmailAgentModalFormWidgetPhoneComponent } from './widget/phone-component';
import { EmailAgentModalFormWidgetReCaptchaComponent } from './widget/re-captcha-component';
import { EmailAgentModalFormWidgetReceiveAdvertisingComponent } from './widget/receive-advertising-component';

export const EmailAgentModalFormComponent = ({
  fieldsValue,
  setFieldsValue,
  onSubmit,
  errors,
  loading,
  t,
}: EmailAgentModalFormComponentPropsInterface): JSX.Element => {
  const hasTermsConditionError = !!errors[FormFieldsEnum.acceptTerms] || !!errors[FormFieldsEnum.receiveAdvertising];

  return (
    <form data-testid='email-agent-form' className={styles.form} onSubmit={onSubmit}>
      <EmailAgentModalFormWidgetNameComponent
        t={t}
        value={fieldsValue.name}
        error={errors[FormFieldsEnum.name]}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, name: newValue })}
      />
      <EmailAgentModalFormWidgetEmailComponent
        t={t}
        value={fieldsValue.email}
        error={errors[FormFieldsEnum.email]}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, email: newValue })}
      />
      <EmailAgentModalFormWidgetPhoneComponent
        t={t}
        value={fieldsValue.phone}
        error={errors[FormFieldsEnum.phone]}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, phone: newValue })}
      />
      <EmailAgentModalFormWidgetMessageComponent
        t={t}
        value={fieldsValue.message}
        error={errors[FormFieldsEnum.message]}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, message: newValue })}
      />
      <EmailAgentModalFormWidgetReCaptchaComponent />
      <EmailAgentModalFormWidgetEmailAlertComponent
        t={t}
        value={fieldsValue.emailAlert}
        onChange={(newValue): void => setFieldsValue({ ...fieldsValue, emailAlert: newValue })}
      />
      {configEmailAgentMustAcceptTerms && hasTermsConditionError && (
        <EmailAgentModalFormAcceptConditionsErrorMessageTemplate error={errors[FormFieldsEnum.acceptTerms]} />
      )}
      {configEmailAgentMustAcceptTerms && (
        <EmailAgentModalFormWidgetAcceptTermsComponent
          t={t}
          value={fieldsValue.acceptTerms}
          error={errors[FormFieldsEnum.acceptTerms]}
          onChange={(newValue): void => setFieldsValue({ ...fieldsValue, acceptTerms: newValue })}
        />
      )}
      {configEmailAgentReceiveAdsEnabled && (
        <EmailAgentModalFormWidgetReceiveAdvertisingComponent
          t={t}
          value={fieldsValue.receiveAdvertising}
          error={errors[FormFieldsEnum.receiveAdvertising]}
          onChange={(newValue): void => setFieldsValue({ ...fieldsValue, receiveAdvertising: newValue })}
        />
      )}

      <ButtonTemplate
        type='submit'
        size={ButtonSizeEnum.regular}
        componentType={ButtonComponentTypeEnum.primary}
        className={styles.button}
        loading={loading}
      >
        {t('agent-modal/cta-send-message')}
      </ButtonTemplate>
    </form>
  );
};
