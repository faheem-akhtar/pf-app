import { UrlQuery } from '../helpers/types';

export interface DataApiFetcherRequestProps {
  /**
   * Locale
   */
  locale: string | void;
  /**
   * Authentication token
   */
  authToken?: string | void | null;
  /**
   * Data
   */
  data?: object;
  /**
   * Url Query object
   */
  query?: UrlQuery | null;
  /**
   * Should reload cache
   */
  reloadCache?: boolean;
}
