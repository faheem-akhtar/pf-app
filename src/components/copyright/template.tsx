import { FunctionalComponent } from 'preact';
import { useTranslationHook } from 'helpers/hook/translation.hook';

export const CopyrightTemplate: FunctionalComponent = () => {
  const { t } = useTranslationHook();
  return <div>{t('copyright')}</div>;
};
