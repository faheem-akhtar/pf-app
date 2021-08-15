import { ApiSwrAuthRequiredFactory } from 'api/swr-auth-required-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { SavedPropertyInterface } from 'types/saved-property/interface';

export const useApiSavedProperties = (): ApiSwrResultType<SavedPropertyInterface[]> =>
  ApiSwrAuthRequiredFactory<SavedPropertyInterface[], { data: SavedPropertyInterface[] }>({
    method: 'GET',
    url: 'user/saved-property',
    dataMapper: ({ data }) => data,
  })({});
