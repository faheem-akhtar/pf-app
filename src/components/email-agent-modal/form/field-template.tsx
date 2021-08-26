import styles from './email-agent-modal-form.module.scss';

export const EmailAgentModalFormFieldTemplate: React.FunctionComponent = (props): JSX.Element => (
  <div className={styles.fieldContainer}>{props.children}</div>
);
