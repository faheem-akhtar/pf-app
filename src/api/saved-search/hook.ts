import { ApiSwrAuthRequiredFactory } from 'api/swr-auth-required-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { SaveSearchLoadResultInterface } from 'components/save-search/load-result-interface';

export const useApiSavedSearch = (): ApiSwrResultType<SaveSearchLoadResultInterface[]> =>
  ApiSwrAuthRequiredFactory<SaveSearchLoadResultInterface[]>({
    method: 'GET',
    url: 'saved-search',
  })({});
