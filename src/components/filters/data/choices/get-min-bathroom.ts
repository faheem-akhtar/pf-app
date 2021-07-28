import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMinBathroomChoiceType } from 'components/filters/value/field/min-bathroom-choice.type';

export const filtersDataChoicesGetMinBathroom =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldMinBathroomChoiceType>(FiltersParametersEnum.minBathroom);
