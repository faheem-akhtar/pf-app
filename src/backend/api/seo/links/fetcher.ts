import { BackendApiFactory } from 'backend/api/factory';
import { BackendModelSeoLinksInterface } from 'backend/model/seo/links.interface';
import { FiltersQueryParamInterface } from 'components/filters/query/param.interface';
import { SeoLinksInterface } from 'components/seo/links/interface';

import { backendApiSeoLinksMapper } from './mapper';
import { backendApiSeoLinksToFilterQueryParams } from './to-filter-query-params';

const fetcher = BackendApiFactory<SeoLinksInterface, BackendModelSeoLinksInterface>({
  method: 'GET',
  url: 'seo/links',
  dataMapper: backendApiSeoLinksMapper,
});

export const backendApiSeoLinksFetcher = (
  locale: string,
  queryParams: FiltersQueryParamInterface
): ReturnType<typeof fetcher> =>
  fetcher({
    locale,
    query: backendApiSeoLinksToFilterQueryParams(queryParams),
  });
