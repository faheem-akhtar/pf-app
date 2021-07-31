import { useTranslation } from 'next-i18next';

export const CopyrightTemplate = (): JSX.Element => {
  const { t } = useTranslation('common');
  return <div>{t('copyright')}</div>;
};
