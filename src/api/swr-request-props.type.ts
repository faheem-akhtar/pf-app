import { DataApiFetcherRequestBasePropsType } from './request-base-props.type';
import { UrlQuery } from 'helpers/types';

export type DataApiSwrRequestPropsType<Query = UrlQuery> = DataApiFetcherRequestBasePropsType<Query> & {
  /**
   * Will not start fetching if true
   */
  swrDoNotFetch?: boolean;
  /**
   * Custom prefix for caching
   */
  swrKeyPostfix?: string;
};
