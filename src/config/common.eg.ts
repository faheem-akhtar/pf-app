import { ConfigCommonInterface } from 'types/config/common.interface';
import { CountryAreaUnitEnum } from 'enums/country/area-unit.enum';
import { CountryCodeEnum } from 'enums/country/code.enum';
import { CountryCurrencyEnum } from 'enums/country/currency.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';

export const configCommon: ConfigCommonInterface = {
  countryCode: CountryCodeEnum.eg,
  areaUnit: CountryAreaUnitEnum.sqm,
  currencyCode: CountryCurrencyEnum.egp,
  language: {
    current: LanguageCodeEnum.en,
    alternative: LanguageCodeEnum.ar,
  },
};
