import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';
import { UrlQueryType } from 'types/url/query.type';

// TODO-FE[CX-411] add tests
export const filtersToSearchQuery = (filtersValue: FiltersValueInterface): UrlQueryType =>
  objectFilterNonOrEmptyValue({
    ...filtersValue,
    [FiltersParametersEnum.locationsIds]: filtersValue[FiltersParametersEnum.locationsIds].map((l) => l.id),
    [FiltersParametersEnum.isDeveloperProperty]: filtersValue[FiltersParametersEnum.isDeveloperProperty]
      ? '1'
      : undefined,
    // TODO-FE[CX-512] remove break_thru_cache workaround
    break_thru_cache: Math.random(),
  });
