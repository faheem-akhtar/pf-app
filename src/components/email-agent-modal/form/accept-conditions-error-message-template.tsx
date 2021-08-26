import { TFunctionType } from 'types/t-function/type';

import styles from './email-agent-modal-form.module.scss';

export const EmailAgentModalFormAcceptConditionsErrorMessageTemplate = ({ t }: { t: TFunctionType }): JSX.Element => (
  <p className={styles.errorText}>{t('agent-modal/accept-conditions-error-message')}</p>
);
