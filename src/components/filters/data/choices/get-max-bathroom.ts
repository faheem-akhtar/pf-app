import { FiltersValueFieldMaxBathroomChoiceType } from 'components/filters/value/field/max-bathroom-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMaxBathroom =
  filtersDataChoicesMakeGetChoices<FiltersValueFieldMaxBathroomChoiceType>(FiltersParametersEnum.maxBathroom);
