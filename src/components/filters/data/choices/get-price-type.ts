import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldPriceTypeChoice } from 'components/filters/value/field/price-type-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetPriceType = filtersDataMakeGetChoices<FiltersValueFieldPriceTypeChoice>(
  FiltersParametersEnum.pricePeriod
);
