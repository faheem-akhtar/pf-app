import { configCommon } from 'config/common';
import { localeIsDefault } from 'helpers/locale/is-default';

export const mortgageFinderGetUrl = (locale: string): string =>
  `https://www.mortgagefinder.ae/r?lang=${
    localeIsDefault(locale) ? `${configCommon.language.current}` : `${configCommon.language.alternative}`
  }`;
