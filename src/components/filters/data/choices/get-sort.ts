import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldSortChoice } from 'components/filters/value/field/sort-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetSort = filtersDataMakeGetChoices<FiltersValueFieldSortChoice>(
  FiltersParametersEnum.sort
);
