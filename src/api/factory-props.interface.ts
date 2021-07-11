import { UrlQuery } from '../helpers/types';

export interface ApiFactoryPropsBaseInterface {
  /**
   * HTTP Method
   */
  method: 'POST' | 'GET' | 'HEAD';
  /**
   * Endpoint url /api/${url}
   */
  url: string;
  /**
   * Default query parameters to be merged with specific paramerters for the request
   */
  queryDefaultParams?: UrlQuery;
}
