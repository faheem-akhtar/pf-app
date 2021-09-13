import { LinkComponent } from 'components/link/component';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { domClassMerge } from 'helpers/dom/class-merge';

import styles from './language-selector.module.scss';
import { LanguageSelectorTemplatePropsInterface } from './template.props.interface';

export const LanguageSelectorTemplate = ({
  targetLocale,
  path,
  label,
}: LanguageSelectorTemplatePropsInterface): JSX.Element => (
  <div className={styles.container}>
    <LinkComponent href={path} locale={targetLocale}>
      <a className={domClassMerge(styles.link, { [styles.linkAr]: targetLocale === LanguageCodeEnum.ar })}>{label}</a>
    </LinkComponent>
  </div>
);
