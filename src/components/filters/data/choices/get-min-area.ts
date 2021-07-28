import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMinAreaChoiceType } from 'components/filters/value/field/min-area-choice.type';

export const filtersDataChoicesGetMinArea = filtersDataChoicesMakeGetChoices<FiltersValueFieldMinAreaChoiceType>(
  FiltersParametersEnum.minArea
);
