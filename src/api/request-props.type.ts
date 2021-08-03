import { AnyValueType } from 'types/any/value.type';
import { ApiRequestBasePropsType } from './request-base-props.type';
import { UrlQueryType } from 'types/url/query.type';

export type ApiRequestPropsType<Query = UrlQueryType, PostData = AnyValueType> = ApiRequestBasePropsType<
  Query,
  PostData
> & {
  /**
   * Locale
   */
  locale: string;
};
