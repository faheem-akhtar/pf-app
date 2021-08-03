import { AnyValueType } from 'types/any/value.type';
import { ApiRequestBasePropsType } from './request-base-props.type';
import { UrlQueryType } from 'types/url/query.type';

export type ApiSwrRequestPropsType<Query = UrlQueryType, PostData = AnyValueType> = ApiRequestBasePropsType<
  Query,
  PostData
> & {
  /**
   * Will not start fetching if true
   */
  swrDoNotFetch?: boolean;
  /**
   * Custom prefix for caching
   */
  swrKeyPostfix?: string;
};
