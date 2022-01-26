import { CountryAreaUnitEnum } from 'enums/country/area-unit.enum';
import { CountryCurrencyEnum } from 'enums/country/currency.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';

import { ConfigCommonInterface } from './common.interface';

export const configCommon: ConfigCommonInterface = {
  areaUnit: CountryAreaUnitEnum.sqm,
  currencyCode: CountryCurrencyEnum.egp,
  countryCode: 'eg',
  insertDefaultLanguage: true,
  language: {
    current: LanguageCodeEnum.ar,
    alternative: LanguageCodeEnum.en,
  },
};
