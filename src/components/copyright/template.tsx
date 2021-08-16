import { useTranslationHook } from 'helpers/hook/translation.hook';

export const CopyrightTemplate: React.FunctionComponent = () => {
  const { t } = useTranslationHook();
  return <div>{t('copyright')}</div>;
};
