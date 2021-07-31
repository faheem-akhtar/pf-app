import { domClassMerge } from 'helpers/dom/class-merge';
import { LanguageCodeEnum } from 'enums/language/code.enum';

import { LanguageSelectorTemplatePropsInterface } from './template.props.interface';
import { LinkComponent } from 'components/link/component';

import styles from './language-selector.module.scss';

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
