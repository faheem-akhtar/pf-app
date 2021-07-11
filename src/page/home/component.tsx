import { useTranslation } from 'next-i18next';

import { FooterComponent } from 'components/footer/component';
import { HeaderComponent } from 'components/header/component';
import { LayoutComponent } from 'components/layout/component';
import { PageHomeComponentPropsInterface } from './component-props.interface';

export const PageHomeComponent = (props: PageHomeComponentPropsInterface): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <LayoutComponent pageTitle={t('home_title')}>
      <HeaderComponent />
      {t('home_title')}
      {JSON.stringify(props)}
      <FooterComponent />
    </LayoutComponent>
  );
};
