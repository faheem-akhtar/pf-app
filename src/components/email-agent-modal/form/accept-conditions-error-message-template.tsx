import styles from './email-agent-modal-form.module.scss';

export const EmailAgentModalFormAcceptConditionsErrorMessageTemplate = ({ error }: { error?: string }): JSX.Element => (
  <p className={styles.errorText}>{error}</p>
);
