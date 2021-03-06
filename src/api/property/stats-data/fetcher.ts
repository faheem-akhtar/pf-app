import { ApiFactory } from 'api/factory';
import { ApiFetcherResultType } from 'api/fetcher-result-type';
import { PropertyObfuscatedStatsDataResultType } from 'components/property/obfuscated-stats-data-result.type';
import { LocaleService } from 'services/locale/service';

import { apiPropertyStatsDataMapper } from './mapper';

export const apiPropertyStatsDataFetcher = (
  propertiesIds: string[],
  pageNumber: number
): Promise<ApiFetcherResultType<any[]>> =>
  ApiFactory<any[], { properties: PropertyObfuscatedStatsDataResultType[] }>({
    method: 'GET',
    url: 'property-search/stats-data',
    handledByPfWebApp: true,
    dataMapper: apiPropertyStatsDataMapper,
  })({
    locale: LocaleService.getLocale(),
    query: { propertiesIds, pageNumber },
  });
