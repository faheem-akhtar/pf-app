import { ApiSwrAuthRequiredFactory } from 'api/swr-auth-required-factory';
import { ApiSwrResultType } from 'api/swr-result-type';
import { SavedPropertyInterface } from 'types/saved-property/interface';

export const useApiSavedPropertiesFactory = <Result>(
  dataMapper: (value: { data: SavedPropertyInterface[] }) => Result
): ApiSwrResultType<Result> =>
  ApiSwrAuthRequiredFactory<Result, { data: SavedPropertyInterface[] }>({
    method: 'GET',
    url: 'user/saved-property',
    dataMapper,
  })({});
