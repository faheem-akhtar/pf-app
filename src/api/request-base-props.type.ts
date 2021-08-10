import { AnyValueType } from 'types/any/value.type';
import { UrlQueryType } from 'types/url/query.type';

export type ApiRequestBasePropsType<Query = UrlQueryType, PostData = AnyValueType> = {
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
   * Post data
   */
  postData?: PostData;
  /**
   * Specify the origin for the request
   */
  getOrigin?: () => string;
  /**
   * Alter headers
   * called on every request letting set custom headers for each request
   */
  alterHeaders?: (headers: Record<string, string>) => void;
};
