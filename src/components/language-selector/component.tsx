import { useRouter } from 'next/router';

import { configCommon } from 'config/common';
import { localeInsertDefault } from 'helpers/locale/insert-default';
import { localeIsDefault } from 'helpers/locale/is-default';
import { useTranslation } from 'helpers/translation/hook';

import { languageSelectorTargetPath } from './target-path';
import { LanguageSelectorTemplate } from './template';

export const LanguageSelectorComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { asPath, locale, query } = useRouter();
  const { current, alternative } = configCommon.language;
  const targetLocale = localeIsDefault(locale as string) ? alternative : current;
  const targetPath = query?.pattern
    ? languageSelectorTargetPath(query.pattern as string, decodeURI(asPath), locale as string, targetLocale)
    : asPath;

  return (
    <LanguageSelectorTemplate
      label={t(`menu.language.${targetLocale}`)}
      targetLocale={targetLocale}
      path={query?.pattern && !localeInsertDefault(targetLocale) ? targetPath : `/${targetLocale}${targetPath}`}
    />
  );
};
