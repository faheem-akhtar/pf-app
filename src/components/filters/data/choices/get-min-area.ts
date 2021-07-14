import { FiltersParametersEnum } from 'enums/filters/parameters.enum';
import { FiltersValueFieldMinAreaChoice } from 'components/filters/value/field/min-area-choice';
import { filtersDataMakeGetChoices } from './make-get-choices';

export const filtersDataChoicesGetMinArea = filtersDataMakeGetChoices<FiltersValueFieldMinAreaChoice>(
  FiltersParametersEnum.minArea
);
