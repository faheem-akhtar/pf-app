import styles from './copyright.module.scss';
import { CopyrightTemplatePropsInterface } from './template-props.interface';

export const CopyrightTemplate: React.FunctionComponent<CopyrightTemplatePropsInterface> = ({ t }) => (
  <p className={styles.text}>{t('copyright')}</p>
);
