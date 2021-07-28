import { ApiSwrFactory } from 'api/swr-factory';
import { filtersValueToQuery } from 'components/filters/value/to-query';

import { ApiSwrResultType } from 'api/swr-result-type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { UrlQueryType } from 'types/url/query.type';

export const useApiPropertySearchCount = (
  filtersValue: FiltersValueInterface,
  doNotFetch: boolean
): ApiSwrResultType<number> =>
  ApiSwrFactory<number>({
    method: 'GET',
    url: 'property-search/count',
  })({ query: filtersValueToQuery(filtersValue) as UrlQueryType, swrDoNotFetch: doNotFetch });
