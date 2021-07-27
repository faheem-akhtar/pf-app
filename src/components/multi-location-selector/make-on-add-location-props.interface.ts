import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from '../location/compact.interface';
import { WindowLocalStorageInterface } from 'helpers/window/local-storage/interface';

export interface MultiLocationSelectorMakeOnAddLocationPropsInterface {
  /**
   * Locations
   */
  locations: LocationCompactInterface[];
  /**
   * On new locations
   */
  onNewLocations: (locationIds: LocationCompactInterface[]) => void;
  /**
   * Local storage interface
   */
  localStorage: WindowLocalStorageInterface;
  /**
   * Locale
   */
  locale: LanguageCodeEnum;
  /**
   * Max history length
   */
  maxHistoryLength: number;
}
