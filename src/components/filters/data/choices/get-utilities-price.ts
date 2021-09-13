import { FiltersValueFieldUtilitiesPriceTypeChoiceType } from 'components/filters/value/field/utilities-price-type-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetUtilitiesPrice =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldUtilitiesPriceTypeChoiceType>(
    FiltersParametersEnum.utilitiesPriceType
  );
