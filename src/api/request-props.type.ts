import { DataApiFetcherRequestBasePropsType } from './request-base-props.type';
import { UrlQuery } from 'helpers/types';

export type DataApiFetcherRequestPropsType<Query = UrlQuery> = DataApiFetcherRequestBasePropsType<Query> & {
  /**
   * Locale
   */
  locale: string;
};
