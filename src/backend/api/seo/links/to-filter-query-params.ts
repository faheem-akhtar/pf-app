import { FiltersQueryParamEnum } from 'components/filters/query/param.enum';
import { FiltersQueryParamInterface } from 'components/filters/query/param.interface';

const allowedParams: string[] = Object.values(FiltersQueryParamEnum);

/**
 * Filters query parameters to get SEO links
 * related to the landing page based on defined values
 * @see routes/landing-pages.js
 */
export const backendApiSeoLinksToFilterQueryParams = <T extends object>(queryParams: T): FiltersQueryParamInterface =>
  Object.entries(queryParams).reduce<FiltersQueryParamInterface>((acc, [queryKey, queryValue]) => {
    if (allowedParams.includes(queryKey)) {
      acc[queryKey as keyof FiltersQueryParamInterface] = decodeURI(queryValue);
    }

    return acc;
  }, {});
