import { FooterComponent } from 'components/footer/component';
import { FunctionalComponent } from 'preact';
import { HeaderComponent } from 'components/header/component';
import { LayoutComponent } from 'components/layout/component';
import { PropertySearchViewPropsInterface } from './view-props.interface';
import { useTranslation } from 'next-i18next';

export const PropertySearchView: FunctionalComponent<PropertySearchViewPropsInterface> = (props) => {
  const { t } = useTranslation('common');

  return (
    <LayoutComponent pageTitle={t('search_title')}>
      <HeaderComponent />
      {JSON.stringify(props.data)}
      <FooterComponent />
    </LayoutComponent>
  );
};
