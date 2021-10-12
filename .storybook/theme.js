import { create } from '@storybook/theming';

// TODO-FE[TPNX-2973]: When the assets have added the project it should be import from there
import logo from '../src/stories/assets/logo.svg';

export default create({
  base: 'light',

  // Colors
  colorPrimary: '#ef5e4e',
  colorSecondary: '#ef5e4e',

  // App
  appContentBg: '#fbe9e0',

  // Brand
  brandTitle: 'PF - Storybook',
  brandUrl: 'https://www.propertyfinder.ae/',
  brandImage: logo,
});
