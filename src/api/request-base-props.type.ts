import { UrlQuery } from 'helpers/types';

export type DataApiFetcherRequestBasePropsType<Query = UrlQuery> = {
  /**
   * Authentication token
   */
  authToken?: string | void | null;
  /**
   * Should reload cache
   */
  reloadCache?: boolean;
  /**
   * Url Query object
   */
  query?: Query;
};
