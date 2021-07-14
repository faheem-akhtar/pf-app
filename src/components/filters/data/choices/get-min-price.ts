import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMinPriceChoice } from 'components/filters/value/field/min-price-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMinPrice = filtersDataMakeGetChoices<FiltersValueFieldMinPriceChoice>(
  FiltersParametersEnum.minPrice
);
