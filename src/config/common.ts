import { ConfigCommonInterface } from 'types/config/common.interface';
import { CountryAreaUnitEnum } from 'enums/country/area-unit.enum';
import { CountryCodeEnum } from 'enums/country/code.enum';
import { CountryCurrencyEnum } from 'enums/country/currency.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';

export const configCommon: ConfigCommonInterface = {
  countryCode: CountryCodeEnum.ae,
  areaUnit: CountryAreaUnitEnum.sqft,
  currencyCode: CountryCurrencyEnum.aed,
  language: {
    current: LanguageCodeEnum.ar,
    alternative: LanguageCodeEnum.en,
  },
};
