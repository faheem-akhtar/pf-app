import { CountryAreaUnitEnum } from 'enums/country/area-unit.enum';
import { CountryCurrencyEnum } from 'enums/country/currency.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { ConfigCommonInterface } from 'types/config/common.interface';

export const configCommon: ConfigCommonInterface = {
  areaUnit: CountryAreaUnitEnum.sqft,
  currencyCode: CountryCurrencyEnum.aed,
  countryCode: 'ae',
  insertDefaultLanguage: true,
  language: {
    current: LanguageCodeEnum.en,
    alternative: LanguageCodeEnum.ar,
  },
};
