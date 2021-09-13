import { FiltersValueFieldMaxBedroomChoiceType } from 'components/filters/value/field/max-bedroom-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMaxBedroom = filtersDataChoicesMakeGetChoices<FiltersValueFieldMaxBedroomChoiceType>(
  FiltersParametersEnum.maxBedroom
);
