import { IconThickSmallCloseTemplate } from 'components/icon/thick/small-close-template';

import { EmailAgentModalFormErrorMessageTemplate } from './form/error-message-template';
import { EmailAgentModalFormSuccessTemplate } from './form/success-template';
import { EmailAgentModalFormTemplate } from './form/template';
import { EmailAgentModalTemplatePropsInterface } from './template-props.interface';

import styles from './email-agent-modal.module.scss';

export const EmailAgentModalTemplate = (props: EmailAgentModalTemplatePropsInterface): JSX.Element => {
  const body =
    props.status === 'submitted' ? (
      <EmailAgentModalFormSuccessTemplate
        onClickNotNow={props.onClickNotNow}
        onClickSignIn={props.onClickSignIn}
        t={props.t}
      />
    ) : (
      <>
        <h2 className={styles.name}>{props.propertyName}</h2>
        <EmailAgentModalFormTemplate
          fieldsValue={props.fieldsValue}
          setFieldsValue={props.setFieldsValue}
          onSubmit={props.onSubmit}
          t={props.t}
        />
      </>
    );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{props.t('agent-modal/email-form-title')}</h1>
        <div className={styles.closeButton} onClick={props.onCloseButtonClick}>
          <IconThickSmallCloseTemplate class={styles.closeIcon} clipped />
        </div>
      </header>

      {props.error && <EmailAgentModalFormErrorMessageTemplate error={props.error} />}
      {body}
    </div>
  );
};
