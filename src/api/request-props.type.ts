import { AnyValueType } from 'types/any/value.type';
import { UrlQueryType } from 'types/url/query.type';

import { ApiRequestBasePropsType } from './request-base-props.type';

export type ApiRequestPropsType<Query = UrlQueryType, PostData = AnyValueType> = ApiRequestBasePropsType<
  Query,
  PostData
> & {
  /**
   * Locale
   */
  locale: string;
};
