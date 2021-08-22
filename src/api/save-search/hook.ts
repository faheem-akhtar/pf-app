import { ApiSwrAuthRequiredFactory } from 'api/swr-auth-required-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';

export const useApiSaveSearch = (): ApiSwrResultType<SaveSearchLoadResultInterface[]> =>
  ApiSwrAuthRequiredFactory<SaveSearchLoadResultInterface[]>({
    method: 'GET',
    url: 'saved-search',
  })({ query: { 'page[limit]': 9999 } });
