import { UrlQuery } from '../helpers/types';

export interface ApiFactoryPropsBaseInterface<R, JR = Object> {
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
  /**
   * Additional data mapper per instance of fetcher
   */
  dataMapper?: (data: JR) => R;
}
