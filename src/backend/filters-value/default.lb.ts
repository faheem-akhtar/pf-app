import { FiltersCategoryIdEnum } from 'enums/filters/category-id.enum';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldCategoryId } from 'components/filters/value/field/category-id';
import { FiltersValueFieldPriceType } from 'components/filters/value/field/price-type';
import { FiltersValueInterface } from 'components/filters/value/interface';
import { PropertyPriceTypeShortEnum } from 'components/property-price-type/short.enum';
import { backendFiltersValueDefaultBase } from './base';

export const backendFiltersValueDefault: FiltersValueInterface = {
  ...backendFiltersValueDefaultBase,
  [FiltersParametersEnum.pricePeriod]: PropertyPriceTypeShortEnum.monthly as FiltersValueFieldPriceType,
  [FiltersParametersEnum.categoryId]: FiltersCategoryIdEnum.residentialForSale as FiltersValueFieldCategoryId,
};