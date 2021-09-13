import { BackendApiFactory } from 'backend/api/factory';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';

import { BackendApiPropertySearchCountResultType } from './count-result.type';

const fetcher = BackendApiFactory<BackendApiPropertySearchCountResultType>({
  method: 'GET',
  url: 'search/count',
});

export const backendApiPropertySearchCountFetcher = (
  locale: string,
  filtersValue: FiltersValueInterface
): ReturnType<typeof fetcher> => {
  return fetcher({
    locale,
    query: objectFilterNonOrEmptyValue({
      ...filtersValue,
      [FiltersParametersEnum.locationsIds]: filtersValue[FiltersParametersEnum.locationsIds].map((l) => l.id),
    }),
  });
};
