import { apiHookFactory } from 'api/hook-factory';
import { filtersValueToQuery } from 'components/filters/value/to-query';

import { ApiHookResultType } from 'api/hook-result-type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { UrlQuery } from 'helpers/types';

export const useApiPropertySearchCount = (filtersValue: FiltersValueInterface): ApiHookResultType<number> =>
  apiHookFactory<number>({
    method: 'GET',
    url: 'property-search/count',
  })({ query: filtersValueToQuery(filtersValue) as UrlQuery });
