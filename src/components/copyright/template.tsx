import { FunctionalComponent } from 'preact';
import { useTranslation } from 'next-i18next';

export const CopyrightTemplate: FunctionalComponent = () => {
  const { t } = useTranslation('common');
  return <div>{t('copyright')}</div>;
};
