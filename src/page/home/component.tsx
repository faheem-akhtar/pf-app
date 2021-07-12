import { useTranslation } from 'next-i18next';
import { PageHomeComponentPropsInterface } from './component-props.interface';
import { HeaderComponent } from 'components/header/component';
import { LayoutComponent } from 'components/layout/component';
import { FooterComponent } from 'components/footer/component';

export const PageHomeComponent = (props: PageHomeComponentPropsInterface) => {
  const { t } = useTranslation('common');

  return (
    <LayoutComponent pageTitle={t('home_title')}>
      <HeaderComponent />
      {t('home_title')}
      <FooterComponent />
    </LayoutComponent>
  );
};
