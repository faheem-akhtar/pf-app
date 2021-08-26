import styles from './email-agent-modal-form.module.scss';

export const EmailAgentModalFormErrorMessageTemplate = ({ error }: { error: string }): JSX.Element => (
  <p className={styles.error}>{error}</p>
);
