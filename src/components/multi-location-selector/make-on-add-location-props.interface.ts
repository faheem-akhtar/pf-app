import { LanguageCodeEnum } from 'enums/language/code.enum';
import { WindowStorageInterface } from 'services/window/storage/interface';
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
  localStorage: WindowStorageInterface;
  /**
   * Locale
   */
  locale: LanguageCodeEnum;
  /**
   * Max history length
   */
  maxHistoryLength: number;
}
