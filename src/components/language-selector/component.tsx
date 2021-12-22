import { useRouter } from 'next/router';

import { configCommon } from 'config/common';
import { localeIsDefault } from 'helpers/locale/is-default';
import { useTranslation } from 'helpers/translation/hook';

import { LanguageSelectorTemplate } from './template';

export const LanguageSelectorComponent = (): JSX.Element => {
  const { t } = useTranslation();
  const { asPath, locale } = useRouter();
  const { current, alternative } = configCommon.language;
  const targetLocale = localeIsDefault(locale as string) ? alternative : current;

  return (
    <LanguageSelectorTemplate label={t(`menu.language.${targetLocale}`)} targetLocale={targetLocale} path={asPath} />
  );
};
