import { StatsDataPropertyInterface } from '@propertyfinder/pf-frontend-common/dist/module/stats/data/property.interface';

import { ApiSwrFactory } from 'api/swr-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { PropertyObfuscatedStatsDataResultType } from 'components/property/obfuscated-stats-data-result.type';

import { apiPropertyStatsDataMapper } from './mapper';

export const useApiPropertyStatsData = (
  propertiesIds: string[],
  pageNumber: number,
  shouldLoad: boolean
): ApiSwrResultType<StatsDataPropertyInterface[]> =>
  ApiSwrFactory<StatsDataPropertyInterface[], { properties: PropertyObfuscatedStatsDataResultType[] }>({
    method: 'GET',
    url: 'property-search/stats-data',
    handledByPfWebApp: true,
    dataMapper: apiPropertyStatsDataMapper,
  })({
    query: { propertiesIds, pageNumber },
    swrDoNotFetch: !shouldLoad,
  });
