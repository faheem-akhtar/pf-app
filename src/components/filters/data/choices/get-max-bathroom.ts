import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMaxBathroomChoiceType } from 'components/filters/value/field/max-bathroom-choice.type';

export const filtersDataChoicesGetMaxBathroom =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldMaxBathroomChoiceType>(FiltersParametersEnum.maxBathroom);
