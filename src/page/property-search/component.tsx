import { useTranslation } from 'next-i18next';

import { FooterComponent } from 'components/footer/component';
import { HeaderComponent } from 'components/header/component';
import { LayoutComponent } from 'components/layout/component';
import { PropertySearchComponentPropsInterface } from './component-props.interface';

export const PagePropertySearchComponent = (props: PropertySearchComponentPropsInterface): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <LayoutComponent pageTitle={t('search_title')}>
      <HeaderComponent />
      {JSON.stringify(props.data)}
      <FooterComponent />
    </LayoutComponent>
  );
};
