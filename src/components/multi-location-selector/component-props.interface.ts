import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from 'types/location/compact.interface';

export interface MultiLocationSelectorComponentPropsInterface {
  /**
   * On change
   */
  onChange: (locationIds: LocationCompactInterface[]) => void;
  /**
   * Value
   */
  value: LocationCompactInterface[];

  /**
   * Locale
   */
  locale: LanguageCodeEnum;

  /**
   * Maximum length of history
   */
  maxHistoryLength?: number;

  /**
   * Maximum number of search results
   */
  maxSearchResults?: number;

  /**
   * Additional css class
   */
  className?: string;
}
