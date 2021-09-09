import { FunctionComponent, useContext, useRef, useState } from 'react';

import { AuthModalComponent } from 'components/auth/modal/component';
import { EmailAgentAttributesInterface } from 'types/email-agent/attributes.interface';
import { EmailAgentModalComponentPropsInterface } from './component-props.interface';
import { EmailAgentModalFormTemplatePropsInterface } from './form/template-props.interface';
import { EmailAgentModalStatusEnum } from './status.enum';
import { EmailAgentModalTemplate } from './template';
import { EmailAgentModalTemplatePropsInterface } from './template-props.interface';
import { FormFieldsEnum } from './form/fields.enum';
import { FormFieldsValueType } from './form/fields-value.type';
import { GoogleRecaptchaService } from 'services/google-recaptcha/service';
import { ModalComponent } from 'components/modal/component';
import { UserContext } from 'context/user/context';

import { apiEmailAgentFetcher } from 'api/email-agent/fetcher';
import { configEmailAgentEmailAlertCheckedByDefault } from 'config/email-agent/email-alert-checked-by-default';
import { configEmailAgentMustAcceptTerms } from 'config/email-agent/must-accept-terms';
import { configEmailAgentReceiveAdsEnabled } from 'config/email-agent/receive-ads-enabled';
import { formMakeValidator } from 'components/form/make-validator';
import { functionNoop } from 'helpers/function/noop';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetName } from 'components/property/serp/obfuscated/get/name';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { useTranslation } from 'helpers/translation/hook';
import { validationEmail } from 'helpers/validation/email';
import { validationPhone } from 'helpers/validation/phone';
import { validationRequired } from 'helpers/validation/required';

const captchaService = new GoogleRecaptchaService();

export const EmailAgentModalComponent: FunctionComponent<EmailAgentModalComponentPropsInterface> = ({
  openRef,
  property,
}) => {
  const { t } = useTranslation();
  const user = useContext(UserContext);

  const openAuthRef = useRef<() => void>(functionNoop);
  const closeAuthRef = useRef<() => void>(functionNoop);
  const closeRef = useRef<() => void>(functionNoop);

  const getInitialFieldsValue = (): FormFieldsValueType => ({
    name: user ? `${user.first_name} ${user.last_name}` : '',
    email: user ? user.email : '',
    phone: '',
    message: t('agent-modal/default-email-message').replace('#{ref}', propertySerpObfuscatedGetReference(property)),
    emailAlert: configEmailAgentEmailAlertCheckedByDefault,
    acceptTerms: false,
    receiveAdvertising: false,
  });
  const [fieldsValue, setFieldsValue] = useState<FormFieldsValueType>(getInitialFieldsValue());
  const [errors, setErrors] = useState<Partial<Record<FormFieldsEnum, string>>>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validators] = useState(() => {
    const state: Record<string, Array<(value: string) => string>> = {
      [FormFieldsEnum.name]: [validationRequired(t('validation/empty-name'))],
      [FormFieldsEnum.email]: [
        validationRequired(t('validation/empty-email')),
        validationEmail(t('validation/not-valid-email')),
      ],
      [FormFieldsEnum.phone]: [
        validationRequired(t('validation/empty-phone-number')),
        validationPhone(t('validation/not-valid-phone-number')),
      ],
      [FormFieldsEnum.message]: [validationRequired(t('validation/empty-message'))],
    };

    if (configEmailAgentMustAcceptTerms) {
      state[FormFieldsEnum.acceptTerms] = [validationRequired(t('agent-modal/accept-conditions-error-message'))];
    }
    if (configEmailAgentReceiveAdsEnabled) {
      state[FormFieldsEnum.receiveAdvertising] = [validationRequired(t('agent-modal/accept-conditions-error-message'))];
    }
    return state;
  });
  const [status, setStatus] = useState<EmailAgentModalStatusEnum>(EmailAgentModalStatusEnum.opened);
  const validate = formMakeValidator(errors, setErrors, validators);

  const onOpen = (): void => {
    setFieldsValue(getInitialFieldsValue());
    setErrors({});
    setStatus(EmailAgentModalStatusEnum.opened);
  };

  const closeModal = (): void => {
    closeRef.current();
  };

  const onSubmit: EmailAgentModalFormTemplatePropsInterface['onSubmit'] = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formFields: Record<string, string | boolean> = {
      [FormFieldsEnum.name]: fieldsValue.name,
      [FormFieldsEnum.email]: fieldsValue.email,
      [FormFieldsEnum.phone]: fieldsValue.phone,
      [FormFieldsEnum.message]: fieldsValue.message,
    };

    if (configEmailAgentMustAcceptTerms) {
      formFields[FormFieldsEnum.acceptTerms] = fieldsValue.acceptTerms;
    }
    if (configEmailAgentReceiveAdsEnabled) {
      formFields[FormFieldsEnum.receiveAdvertising] = fieldsValue.receiveAdvertising;
    }

    const hasErrors = validate(formFields);

    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    setStatus(EmailAgentModalStatusEnum.submitting);
    setError('');

    const captcha_token = await captchaService.execute();

    try {
      await apiEmailAgentFetcher({
        propertyId: parseInt(propertySerpObfuscatedGetId(property), 10),
        ...formFields,
        emailAlert: fieldsValue.emailAlert,
        [FormFieldsEnum.captchaToken]: captcha_token,
        autoRegister: !!user,
      } as EmailAgentAttributesInterface);

      setStatus(EmailAgentModalStatusEnum.submitted);
    } catch {
      setError(t('something-wrong-try-again'));
      captchaService.reset();
    } finally {
      setIsLoading(false);
    }
  };

  const templateProps: EmailAgentModalTemplatePropsInterface = {
    propertyName: propertySerpObfuscatedGetName(property),
    onSubmit,
    closeModal,
    fieldsValue,
    setFieldsValue,
    errors,
    t,
    status,
    error,
    loading: isLoading,
    openAuthRef,
  };

  return (
    <>
      <ModalComponent
        onOpen={onOpen}
        openRef={openRef}
        closeRef={closeRef}
        overlay
        onOverlayClick={(): void => closeRef.current()}
      >
        <EmailAgentModalTemplate {...templateProps} />
      </ModalComponent>
      <ModalComponent openRef={openAuthRef} closeRef={closeAuthRef} overlay>
        <AuthModalComponent
          close={(): void => {
            closeAuthRef.current();
          }}
        />
      </ModalComponent>
    </>
  );
};
