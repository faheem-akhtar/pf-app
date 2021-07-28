import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldPricePeriodChoiceType } from 'components/filters/value/field/price-period-choice.type';

export const filtersDataChoicesGetPricePeriod =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldPricePeriodChoiceType>(FiltersParametersEnum.pricePeriod);
