import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { PropertyPriceTypeShortEnum } from 'enums/property/price-type-short.enum';

import { backendFiltersValueDefaultBase } from './default-base';

export const backendFiltersValueDefault: FiltersValueInterface = {
  ...backendFiltersValueDefaultBase,
  [FiltersParametersEnum.pricePeriod]: PropertyPriceTypeShortEnum.monthly as FiltersValueFieldPricePeriodType,
};
