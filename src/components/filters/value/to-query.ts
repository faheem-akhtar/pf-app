import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersQueryParametersEnum } from 'enums/filters/query-parameters.enum';
import { objectFilterNonOrEmptyValue } from 'helpers/object/filter/non-or-empty-value';

import { FiltersQueryInterface } from '../query/interface';
import { FiltersValueInterface } from './interface';

// TODO-FE[CX-411] Add tests
export const filtersValueToQuery = (params: FiltersValueInterface): FiltersQueryInterface => {
  return objectFilterNonOrEmptyValue<FiltersQueryInterface>({
    [FiltersQueryParametersEnum.locationsIds]: params[FiltersParametersEnum.locationsIds].map((l) => l.id).join('-'),
    [FiltersQueryParametersEnum.categoryId]: params[FiltersParametersEnum.categoryId],
    [FiltersQueryParametersEnum.propertyTypeId]: params[FiltersParametersEnum.propertyTypeId],
    [FiltersQueryParametersEnum.minBedroom]: params[FiltersParametersEnum.minBedroom],
    [FiltersQueryParametersEnum.maxBedroom]: params[FiltersParametersEnum.maxBedroom],
    [FiltersQueryParametersEnum.minBathroom]: params[FiltersParametersEnum.minBathroom],
    [FiltersQueryParametersEnum.maxBathroom]: params[FiltersParametersEnum.maxBathroom],
    [FiltersQueryParametersEnum.minPrice]: String(params[FiltersParametersEnum.minPrice] || ''),
    [FiltersQueryParametersEnum.maxPrice]: String(params[FiltersParametersEnum.maxPrice] || ''),
    [FiltersQueryParametersEnum.furnishing]: params[FiltersParametersEnum.furnishing],
    [FiltersQueryParametersEnum.minArea]: String(params[FiltersParametersEnum.minArea] || ''),
    [FiltersQueryParametersEnum.maxArea]: String(params[FiltersParametersEnum.maxArea] || ''),
    [FiltersQueryParametersEnum.pricePeriod]: params[FiltersParametersEnum.pricePeriod],
    [FiltersQueryParametersEnum.keyword]: params[FiltersParametersEnum.keyword],
    [FiltersQueryParametersEnum.amenities]: params[FiltersParametersEnum.amenities],
    [FiltersQueryParametersEnum.completionStatus]: params[FiltersParametersEnum.completionStatus],
    [FiltersQueryParametersEnum.paymentMethod]: params[FiltersParametersEnum.paymentMethod],
    [FiltersQueryParametersEnum.utilitiesPriceType]: params[FiltersParametersEnum.utilitiesPriceType],
    [FiltersQueryParametersEnum.virtualViewings]: params[FiltersParametersEnum.virtualViewings],
    [FiltersQueryParametersEnum.isDeveloperProperty]: params[FiltersParametersEnum.isDeveloperProperty] ? '1' : '',
    [FiltersQueryParametersEnum.minInstallmentYears]: String(params[FiltersParametersEnum.minInstallmentYears] || ''),
    [FiltersQueryParametersEnum.maxInstallmentYears]: String(params[FiltersParametersEnum.maxInstallmentYears] || ''),
    [FiltersQueryParametersEnum.sort]: params[FiltersParametersEnum.sort],
  });
};
