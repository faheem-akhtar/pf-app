import { useTranslation } from 'next-i18next';

import { FooterComponent } from 'components/footer/component';
import { HeaderComponent } from 'components/header/component';
import { LayoutComponent } from 'components/layout/component';
import { PropertySearchComponentPropsType } from './view-props.type';
import { isClient } from 'helpers/isClient';

export const PropertySearchView = (props: PropertySearchComponentPropsType): JSX.Element => {
  const { t } = useTranslation('common');

  if (!props.ok) {
    return <div>Error: ${props.error}</div>;
  }

  if (isClient) {
    // TODO-FE[TPNX-2938] remove the console.log
    // eslint-disable-next-line no-console
    console.log('page props', props);
  }

  return (
    <LayoutComponent pageTitle={t('search_title')}>
      <HeaderComponent />
      <div>see console</div>
      <FooterComponent />
    </LayoutComponent>
  );
};
