import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMaxBedroomChoiceType } from 'components/filters/value/field/max-bedroom-choice.type';

export const filtersDataChoicesGetMaxBedroom = filtersDataChoicesMakeGetChoices<FiltersValueFieldMaxBedroomChoiceType>(
  FiltersParametersEnum.maxBedroom
);
