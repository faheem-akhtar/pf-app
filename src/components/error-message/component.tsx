import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './error-message.module.scss';

export const ErrorMessageComponent = ({ message, className }: { message: string; className?: string }): JSX.Element => (
  <div className={domClassMerge(styles.error, styles['error-message'], className)}>{message}</div>
);
