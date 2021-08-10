import { FooterComponent } from 'components/footer/component';
import { FunctionalComponent } from 'preact';
import { HeaderComponent } from 'components/header/component';
import { HomeViewPropsInterface } from './view-props.interface';
import { LayoutComponent } from 'components/layout/component';
import { useTranslationHook } from 'helpers/hook/translation.hook';

export const HomeView: FunctionalComponent<HomeViewPropsInterface> = () => {
  const { t } = useTranslationHook();

  return (
    <LayoutComponent pageTitle={t('home_title')}>
      <HeaderComponent />
      {t('home_title')}
      <FooterComponent />
    </LayoutComponent>
  );
};
