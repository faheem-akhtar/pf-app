import { useRouter } from 'next/router';

import { configCommon } from 'config/common';
import { useTranslationHook } from 'helpers/hook/translation.hook';

import { LanguageSelectorTemplate } from './template';

export const LanguageSelectorComponent = (): JSX.Element => {
  const { t } = useTranslationHook();
  const { asPath, locale } = useRouter();

  const renderTemplate = (): JSX.Element =>
    locale === configCommon.language.current ? (
      <LanguageSelectorTemplate
        label={t(`menu.language.${configCommon.language.alternative}`)}
        targetLocale={configCommon.language.alternative}
        path={asPath}
      />
    ) : (
      <LanguageSelectorTemplate
        label={t(`menu.language.${configCommon.language.current}`)}
        targetLocale={configCommon.language.current}
        path={asPath}
      />
    );

  return renderTemplate();
};
