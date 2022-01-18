import { LanguageCodeEnum } from 'enums/language/code.enum';
import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './language-selector.module.scss';
import { LanguageSelectorTemplatePropsInterface } from './template-props.interface';

export const LanguageSelectorTemplate = ({
  targetLocale,
  path,
  label,
}: LanguageSelectorTemplatePropsInterface): JSX.Element => (
  <div className={styles.container} data-testid='language-selector'>
    <a
      aria-label='language-selector'
      href={decodeURI(path)}
      className={domClassMerge(styles.link, { [styles.linkAr]: targetLocale === LanguageCodeEnum.ar })}
    >
      {label}
    </a>
  </div>
);
