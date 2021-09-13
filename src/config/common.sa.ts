import { CountryAreaUnitEnum } from 'enums/country/area-unit.enum';
import { CountryCurrencyEnum } from 'enums/country/currency.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';
import { ConfigCommonInterface } from 'types/config/common.interface';

export const configCommon: ConfigCommonInterface = {
  areaUnit: CountryAreaUnitEnum.sqm,
  currencyCode: CountryCurrencyEnum.sar,
  countryCode: 'sa',
  language: {
    current: LanguageCodeEnum.ar,
    alternative: LanguageCodeEnum.en,
  },
};
