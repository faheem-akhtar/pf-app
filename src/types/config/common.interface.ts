import { CountryAreaUnitEnum } from 'enums/country/area-unit.enum';
import { CountryCodeEnum } from 'enums/country/code.enum';
import { CountryCurrencyEnum } from 'enums/country/currency.enum';
import { LanguageConfigInterface } from 'types/language/config.interface';

export interface ConfigCommonInterface {
  /**
   * country code
   */
  countryCode: CountryCodeEnum;

  /**
   * area unit
   */
  areaUnit: CountryAreaUnitEnum;

  /**
   * currency code
   */
  currencyCode: CountryCurrencyEnum;

  /**
   * language interface for country
   */
  language: LanguageConfigInterface;
}
