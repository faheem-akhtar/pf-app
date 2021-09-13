import { FiltersValueFieldMinBedroomChoiceType } from 'components/filters/value/field/min-bedroom-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMinBedroom = filtersDataChoicesMakeGetChoices<FiltersValueFieldMinBedroomChoiceType>(
  FiltersParametersEnum.minBedroom
);
