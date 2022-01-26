import { ApiSwrAuthRequiredFactory } from 'api/swr-auth-required-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { SaveSearchInterface } from 'components/save-search/interface';

export const useApiSaveSearch = (): ApiSwrResultType<SaveSearchInterface[]> =>
  ApiSwrAuthRequiredFactory<SaveSearchInterface[]>({
    method: 'GET',
    url: 'saved-search',
    handledByPfWebApp: true,
  })({ query: { 'page[limit]': 9999 } });
