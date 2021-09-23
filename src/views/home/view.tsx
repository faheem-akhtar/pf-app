import { FooterComponent } from 'components/footer/component';
import { HeaderComponent } from 'components/header/component';

import { HomeViewPropsInterface } from './view-props.interface';

export const HomeView: React.FunctionComponent<HomeViewPropsInterface> = () => {
  return (
    <>
      <HeaderComponent />
      {'TODO-FE[CX-???]'}
      <FooterComponent />
    </>
  );
};
