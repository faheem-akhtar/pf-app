import { useTranslation } from 'helpers/translation/hook';

export const CopyrightTemplate: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return <div>{t('copyright')}</div>;
};
