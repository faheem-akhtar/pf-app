import { FooterComponent } from 'components/footer/component';
import { FunctionalComponent } from 'preact';
import { HeaderComponent } from 'components/header/component';
import { HomeViewPropsInterface } from './view-props.interface';
import { LayoutComponent } from 'components/layout/component';
import { useTranslation } from 'next-i18next';

export const HomeView: FunctionalComponent<HomeViewPropsInterface> = () => {
  const { t } = useTranslation('common');

  return (
    <LayoutComponent pageTitle={t('home_title')}>
      <HeaderComponent />
      {t('home_title')}
      <FooterComponent />
    </LayoutComponent>
  );
};
