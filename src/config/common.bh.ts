import { ConfigCommonInterface } from 'types/config/common.interface';
import { CountryAreaUnitEnum } from 'enums/country/area-unit.enum';
import { CountryCurrencyEnum } from 'enums/country/currency.enum';
import { LanguageCodeEnum } from 'enums/language/code.enum';

export const configCommon: ConfigCommonInterface = {
  areaUnit: CountryAreaUnitEnum.sqm,
  currencyCode: CountryCurrencyEnum.bhd,
  language: {
    current: LanguageCodeEnum.en,
    alternative: LanguageCodeEnum.ar,
  },
};