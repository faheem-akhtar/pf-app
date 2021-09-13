import { FiltersValueFieldSortChoiceType } from 'components/filters/value/field/sort-choice.type';
import { FiltersParametersEnum } from 'enums/filters/parameters.enum';

import { filtersDataChoicesMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetSort = filtersDataChoicesMakeGetChoices<FiltersValueFieldSortChoiceType>(
  FiltersParametersEnum.sort
);
