import { CountryAreaUnitEnum } from 'enums/country/area-unit.enum';
import { CountryCurrencyEnum } from 'enums/country/currency.enum';
import { LanguageConfigInterface } from 'types/language/config.interface';

export interface ConfigCommonInterface {
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
