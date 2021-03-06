import { AnyValueType } from 'types/any/value.type';
import { UrlQueryType } from 'types/url/query.type';

import { ApiHttpMethodType } from './http-method.type';

export interface ApiFactoryPropsInterface<Result, Data = AnyValueType, RawJson = AnyValueType> {
  /**
   * Alter headers
   * called on every request letting set custom headers for each request
   */
  alterHeaders?: (headers: Record<string, string>) => void;
  /**
   * HTTP Method
   */
  method: ApiHttpMethodType;
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
  /**
   * Api handler defined in pf-web-app
   */
  handledByPfWebApp?: true;
  /**
   * Payload is formdata
   */
  formData?: boolean;
}
