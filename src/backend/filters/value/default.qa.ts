import { backendFiltersValueDefaultBase } from './default-base';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldPricePeriodType } from 'components/filters/value/field/price-period.type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { PropertyPriceTypeShortEnum } from 'enums/property/price-type-short.enum';

export const backendFiltersValueDefault: FiltersValueInterface = {
  ...backendFiltersValueDefaultBase,
  [FiltersParametersEnum.pricePeriod]: PropertyPriceTypeShortEnum.monthly as FiltersValueFieldPricePeriodType,
};
