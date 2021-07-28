import { UrlQueryType } from 'types/url/query.type';

export interface ApiFactoryPropsInterface<Result, Data = Object, RawJson = Object> {
  // TODO-FE[TPNX-3062] Add capabilities for POST
  /**
   * True if this endpoint requires user to be logged in
   */
  requireAuth?: boolean;
  /**
   * HTTP Method
   */
  method: 'GET' | 'HEAD';
  /**
   * Endpoint url /api/${url}
   */
  url: string;
  /**
   * Default query parameters to be merged with specific paramerters for the request
   */
  queryDefaultParams?: UrlQueryType;
  /**
   * Additional data mapper per instance of fetcher
   */
  dataMapper?: (data: Data, rawJson: RawJson) => Result;
}
