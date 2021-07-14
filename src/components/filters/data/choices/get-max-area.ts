import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMaxAreaChoice } from 'components/filters/value/field/max-area-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMaxArea = filtersDataMakeGetChoices<FiltersValueFieldMaxAreaChoice>(
  FiltersParametersEnum.maxArea
);
