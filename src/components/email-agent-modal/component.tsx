import { FunctionComponent, useRef, useState } from 'react';

import { configEmailAgentEmailAlertCheckedByDefault } from 'config/email-agent/email-alert-checked-by-default';
import { functionNoop } from 'helpers/function/noop';
import { useTranslation } from 'helpers/translation/hook';

import { EmailAgentModalComponentPropsInterface } from './component-props.interface';
import { EmailAgentModalFormTemplatePropsInterface } from './form/template-props.interface';
import { EmailAgentModalStatusEnum } from './status.enum';
import { EmailAgentModalTemplate } from './template';
import { EmailAgentModalTemplatePropsInterface } from './template-props.interface';
import { FormFieldsValueType } from './form/fields-value.type';
import { ModalComponent } from 'components/modal/component';

// TODO[CX-442] Implement input validators
export const EmailAgentModalComponent: FunctionComponent<EmailAgentModalComponentPropsInterface> = ({
  openRef,
  propertyName,
  referenceId,
}) => {
  const { t } = useTranslation();
  const closeRef = useRef<() => void>(functionNoop);
  const getInitialFieldsValue = (): FormFieldsValueType => ({
    name: '',
    email: '',
    phone: '',
    message: t('agent-modal/default-email-message').replace('#{ref}', referenceId),
    emailAlert: configEmailAgentEmailAlertCheckedByDefault,
    acceptTerms: false,
    receiveAdvertising: false,
  });

  const [fieldsValue, setFieldsValue] = useState<FormFieldsValueType>(getInitialFieldsValue());
  const [status, setStatus] = useState<EmailAgentModalStatusEnum>(EmailAgentModalStatusEnum.opened);

  const onOpen = (): void => {
    setFieldsValue(getInitialFieldsValue());
    setStatus(EmailAgentModalStatusEnum.opened);
  };

  const close = (): void => {
    closeRef.current();
  };

  // TODO[CX-218] Trigger login pop-up modal
  const onClickSignIn = (): void => undefined;

  // TODO: Implement API process
  const onSubmit: EmailAgentModalFormTemplatePropsInterface['onSubmit'] = (e) => {
    e.preventDefault();
    setStatus(EmailAgentModalStatusEnum.submitting);
    setTimeout(() => {
      setStatus(EmailAgentModalStatusEnum.submitted);
    });
  };

  const templateProps: EmailAgentModalTemplatePropsInterface = {
    propertyName,
    onSubmit,
    onCloseButtonClick: close,
    onClickSignIn,
    onClickNotNow: close,
    fieldsValue,
    setFieldsValue,
    t,
    status,
  };

  return (
    <ModalComponent onOpen={onOpen} openRef={openRef} closeRef={closeRef} overlay>
      <EmailAgentModalTemplate {...templateProps} />
    </ModalComponent>
  );
};
