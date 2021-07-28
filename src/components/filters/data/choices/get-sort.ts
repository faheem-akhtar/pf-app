import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldSortChoiceType } from 'components/filters/value/field/sort-choice.type';

export const filtersDataChoicesGetSort = filtersDataChoicesMakeGetChoices<FiltersValueFieldSortChoiceType>(
  FiltersParametersEnum.sort
);
