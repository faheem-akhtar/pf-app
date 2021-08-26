import styles from './email-agent-modal-sign-in.module.scss';

export const EmailAgentModalSignInItemTemplate: React.FunctionComponent<{ icon: JSX.Element }> = (
  props
): JSX.Element => (
  <li className={styles.item}>
    {props.icon}
    <p>{props.children}</p>
  </li>
);
