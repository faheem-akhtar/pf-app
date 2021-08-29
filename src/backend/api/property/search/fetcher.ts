import { backendApiPropertySearchRawFetcher } from './raw-fetcher';
import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueInterface } from 'components/filters/value/interface';

export const backendApiPropertySearchFetcher = (
  locale: string,
  filtersValue: FiltersValueInterface
): ReturnType<typeof backendApiPropertySearchRawFetcher> => {
  return backendApiPropertySearchRawFetcher({
    locale,
    query: objectFilterNonOrEmptyValue({
      ...filtersValue,
      // TODO-FE[CX-512] remove break_thru_cache workaround
      break_thru_cache: Math.random(),
      [FiltersParametersEnum.locationsIds]: filtersValue[FiltersParametersEnum.locationsIds].map((l) => l.id),
    }),
  });
};
