import { ApiRequestBasePropsType } from './request-base-props.type';
import { UrlQueryType } from 'types/url/query.type';

export type ApiSwrRequestPropsType<Query = UrlQueryType> = ApiRequestBasePropsType<Query> & {
  /**
   * Will not start fetching if true
   */
  swrDoNotFetch?: boolean;
  /**
   * Custom prefix for caching
   */
  swrKeyPostfix?: string;
};
