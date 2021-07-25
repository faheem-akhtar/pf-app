import { LanguageCodeEnum } from 'enums/language/code.enum';
import { LocationCompactInterface } from './compact.interface';

export interface LocationServiceInterface {
  /**
   * Initialize the location worker
   * @param etag current version of etag
   * @param locale the current language
   * Will resolve the promise with empty string if the etag is up to date
   * If resolved with non empty string, the new etag should be persisted for the next use
   */
  init: (locale: LanguageCodeEnum) => void;
  /**
   * Search for locations
   * @param searchString user input
   * @param limit optional number of results to return
   */
  search: (searchString: string, limit: number) => Promise<LocationCompactInterface[]>;
}
