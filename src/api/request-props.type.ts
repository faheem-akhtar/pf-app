import { ApiRequestBasePropsType } from './request-base-props.type';
import { UrlQueryType } from 'types/url/query.type';

export type ApiRequestPropsType<Query = UrlQueryType> = ApiRequestBasePropsType<Query> & {
  /**
   * Locale
   */
  locale: string;
};
