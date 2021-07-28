import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMinBedroomChoiceType } from 'components/filters/value/field/min-bedroom-choice.type';

export const filtersDataChoicesGetMinBedroom = filtersDataChoicesMakeGetChoices<FiltersValueFieldMinBedroomChoiceType>(
  FiltersParametersEnum.minBedroom
);
