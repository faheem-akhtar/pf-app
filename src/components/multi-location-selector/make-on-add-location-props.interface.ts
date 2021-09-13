import { LanguageCodeEnum } from 'enums/language/code.enum';
import { WindowLocalStorageInterface } from 'services/window/local-storage/interface';
import { LocationCompactInterface } from 'types/location/compact.interface';

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
