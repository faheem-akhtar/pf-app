import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMaxPriceChoice } from 'components/filters/value/field/max-price-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMaxPrice = filtersDataMakeGetChoices<FiltersValueFieldMaxPriceChoice>(
  FiltersParametersEnum.maxPrice
);
