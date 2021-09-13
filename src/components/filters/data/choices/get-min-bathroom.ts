import { FiltersValueFieldMinBathroomChoiceType } from 'components/filters/value/field/min-bathroom-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMinBathroom =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldMinBathroomChoiceType>(FiltersParametersEnum.minBathroom);
