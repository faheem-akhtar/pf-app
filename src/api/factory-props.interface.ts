import { AnyValueType } from 'types/any/value.type';
import { UrlQueryType } from 'types/url/query.type';

export interface ApiFactoryPropsInterface<Result, Data = AnyValueType, RawJson = AnyValueType> {
  /**
   * True if this endpoint requires user to be logged in
   */
  requireAuth?: boolean;
  /**
   * HTTP Method
   */
  method: 'GET' | 'HEAD' | 'POST';
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
