import { FiltersValueFieldPricePeriodChoiceType } from 'components/filters/value/field/price-period-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetPricePeriod =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldPricePeriodChoiceType>(FiltersParametersEnum.pricePeriod);
