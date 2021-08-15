import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldUtilitiesPriceTypeChoiceType } from 'components/filters/value/field/utilities-price-type-choice.type';

export const filtersDataChoicesGetUtilitiesPrice =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldUtilitiesPriceTypeChoiceType>(
    FiltersParametersEnum.utilitiesPriceType
  );
