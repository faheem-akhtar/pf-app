import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMaxAreaChoiceType } from 'components/filters/value/field/max-area-choice.type';

export const filtersDataChoicesGetMaxArea = filtersDataChoicesMakeGetChoices<FiltersValueFieldMaxAreaChoiceType>(
  FiltersParametersEnum.maxArea
);
