import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { backendApiPropertySearchRawFetcher } from './raw-fetcher';

export const backendApiPropertySearchFetcher = (
  locale: string,
  filtersValue: FiltersValueInterface
): ReturnType<typeof backendApiPropertySearchRawFetcher> => {
  return backendApiPropertySearchRawFetcher({
    locale,
    query: objectFilterNonOrEmptyValue({
      ...filtersValue,
      [FiltersParametersEnum.locationsIds]: filtersValue[FiltersParametersEnum.locationsIds].map((l) => l.id),
    }),
  });
};
