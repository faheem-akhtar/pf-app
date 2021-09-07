import { IconThickSmallCloseTemplate } from 'components/icon/thick/small-close-template';

import { EmailAgentModalFormErrorMessageTemplate } from './form/error-message-template';
import { EmailAgentModalFormSuccessTemplate } from './form/success-template';
import { EmailAgentModalFormTemplate } from './form/template';
import { EmailAgentModalStatusEnum } from './status.enum';
import { EmailAgentModalTemplatePropsInterface } from './template-props.interface';

import styles from './email-agent-modal.module.scss';

export const EmailAgentModalTemplate = (props: EmailAgentModalTemplatePropsInterface): JSX.Element => {
  const body =
    props.status === EmailAgentModalStatusEnum.submitted ? (
      <EmailAgentModalFormSuccessTemplate closeModal={props.closeModal} t={props.t} />
    ) : (
      <>
        <h2 className={styles.name}>{props.propertyName}</h2>
        <EmailAgentModalFormTemplate
          fieldsValue={props.fieldsValue}
          setFieldsValue={props.setFieldsValue}
          onSubmit={props.onSubmit}
          t={props.t}
          errors={props.errors}
          loading={props.loading}
        />
      </>
    );

  return (
    <div
      className={styles.container}
      onClick={(e): void => {
        e.stopPropagation();
      }}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>{props.t('agent-modal/email-form-title')}</h1>
        <div className={styles.closeButton} onClick={props.closeModal}>
          <IconThickSmallCloseTemplate class={styles.closeIcon} clipped />
        </div>
      </header>

      {props.error && <EmailAgentModalFormErrorMessageTemplate error={props.error} />}
      {body}
    </div>
  );
};
