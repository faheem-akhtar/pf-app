import { FooterComponent } from 'components/footer/component';
import { HeaderComponent } from 'components/header/component';
import { HomeViewPropsInterface } from './view-props.interface';
import { LayoutComponent } from 'components/layout/component';

export const HomeView: React.FunctionComponent<HomeViewPropsInterface> = () => {
  return (
    <LayoutComponent pageTitle={'TODO-FE[CX-396]'}>
      <HeaderComponent />
      {'TODO-FE[CX-396]'}
      <FooterComponent />
    </LayoutComponent>
  );
};
