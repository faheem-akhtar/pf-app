import { UrlQueryType } from 'types/url/query.type';

export type ApiRequestBasePropsType<Query = UrlQueryType> = {
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
  /**
   * Specify the origin for the request
   */
  getOrigin?: () => string;
};
